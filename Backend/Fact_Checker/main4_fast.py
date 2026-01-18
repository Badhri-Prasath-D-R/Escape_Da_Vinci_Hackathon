import gradio as gr 
import chromadb 
import pandas as pd 
import sqlite3
import os
import torch 
import numpy as np
import warnings
import hashlib  # Used for unique ID generation
from difflib import SequenceMatcher 
from sentence_transformers import SentenceTransformer, CrossEncoder
from chromadb.api.types import EmbeddingFunction, Documents, Embeddings

warnings.filterwarnings("ignore")

# Check for GPU
device = "cuda" if torch.cuda.is_available() else "cpu"

class CustomEmbeddingFunction(EmbeddingFunction):
    def __init__(self, model): 
        self.model = model
    def __call__(self, input: Documents) -> Embeddings: 
        return self.model.encode(input, device=device, convert_to_numpy=True).tolist()

class PIBFactChecker:
    def __init__(self, db_path: str = None):

        if db_path is None:
            # Get the directory of main4_fast.py (Backend/Fact_Checker)
            CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
            # Go up one level to Backend/
            BACKEND_DIR = os.path.dirname(CURRENT_DIR)
            # Now point to Backend/Database/news_articles.db
            db_path = os.path.join(BACKEND_DIR, "Database", "news_articles.db")
        print(f"🚀 Initializing CrisisTruthAI v2.1 (Device: {device})...")
        
        # Load Models
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2', device=device)
        self.embedding_fn = CustomEmbeddingFunction(self.embedding_model)
        self.verifier = CrossEncoder('cross-encoder/nli-deberta-v3-small', device=device)
        
        if device == "cuda":
            self.embedding_model.half()

        # Initialize ChromaDB
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(
            name="news_facts", 
            embedding_function=self.embedding_fn
        )
        
        # Incremental Sync on Startup
        if os.path.exists(db_path): 
            self.sync_incremental(db_path)
        else:
            print(f"⚠️ Warning: Database file not found at {db_path}")

    def generate_id(self, url: str):
        """Creates a stable, unique ID for an article based on its URL."""
        return hashlib.md5(url.encode()).hexdigest()

    def sync_incremental(self, db_path: str):
        """Syncs only the 'delta' (new records) from the latest 5000 in SQLite."""
        conn = sqlite3.connect(db_path)
        # Fetch latest 5000 items to ensure freshness
        query = "SELECT url, title, summary, source, scraped_at FROM news ORDER BY scraped_at DESC LIMIT 5000"
        df = pd.read_sql_query(query, conn)
        conn.close()

        if df.empty:
            print("🛑 SQLite database is empty.")
            return

        # Fetch IDs already existing in ChromaDB to avoid re-embedding
        # We only need the IDs, so we include=[] for speed
        existing_ids = set(self.collection.get(include=[])['ids'])
        
        new_docs, new_metadatas, new_ids = [], [], []

        for _, r in df.iterrows():
            doc_id = self.generate_id(r['url'])
            if doc_id not in existing_ids:
                new_docs.append(f"{r['title']} | {r['summary'] or ''}")
                new_metadatas.append({"source": str(r['source']), "date": str(r['scraped_at'])})
                new_ids.append(doc_id)

        if new_docs:
            print(f"🔄 Found {len(new_docs)} new records. Embedding and syncing...")
            batch_size = 500 
            for i in range(0, len(new_docs), batch_size):
                end_idx = min(i + batch_size, len(new_docs))
                self.collection.upsert(
                    documents=new_docs[i:end_idx], 
                    metadatas=new_metadatas[i:end_idx], 
                    ids=new_ids[i:end_idx]
                )
            print(f"✅ Incremental sync complete. Total in vector store: {self.collection.count()}")
        else:
            print(f"✅ Vector store is already up-to-date with the latest 5000 records.")

    def clean_text(self, text: str):
        for tag in [" - The Hindu", " - Times of India", "PTI", "ANI", " | "]:
            text = text.replace(tag, " ")
        return " ".join(text.split()).strip()

    def verify_claim(self, claim: str):
        search_results = self.collection.query(query_texts=[claim], n_results=5)
        
        if not search_results['documents'] or not search_results['documents'][0]:
            return "Unverifiable", {"Neutral": 1.0}, "No matching records found.", "N/A"

        full_evidence_raw = search_results['documents'][0][0]
        meta = search_results['metadatas'][0][0]
        clean_evidence = self.clean_text(full_evidence_raw)
        clean_claim = self.clean_text(claim)

        # Basic lexical similarity check
        is_literal_match = clean_claim.lower() in clean_evidence.lower()
        fuzzy_sim = SequenceMatcher(None, clean_evidence.lower(), clean_claim.lower()).ratio()
        
        # Cross-Encoder re-ranking/verification
        scores = self.verifier.predict([[clean_evidence, clean_claim]])[0]
        exp_scores = np.exp(scores)
        probs = exp_scores / np.sum(exp_scores)
        
        # Boost confidence for literal matches
        if is_literal_match or fuzzy_sim > 0.75:
            probs[1] = max(probs[1], 0.98)
            probs[2] = min(probs[2], 0.02)

        conf_dict = {
            "True (Match)": float(probs[1]),
            "False (Conflict)": float(probs[0]),
            "Neutral (Unrelated)": float(probs[2])
        }

        if probs[1] > 0.5:
            verdict = "True"
            reason = f"Confirmed by {meta['source']}. Direct match found."
        elif probs[0] > 0.5:
            verdict = "False"
            reason = f"Contradicted by reporting from {meta['source']}."
        else:
            verdict = "Unverifiable"
            reason = "Details are insufficient for a clear verdict."

        return verdict, conf_dict, reason, full_evidence_raw

    def check_fact(self, user_input: str):
        if not user_input.strip():
            return "## ⚠️ Please enter a claim.", {}, {}
        verdict, scores, reason, evidence = self.verify_claim(user_input)
        color = "#28a745" if verdict == "True" else "#dc3545" if verdict == "False" else "#ffc107"
        summary_md = f"## Verdict: <span style='color:{color}'>{verdict}</span>\n**Reasoning:** {reason}\n\n---\n**Evidence:**\n> {evidence}"
        return summary_md, scores, {"verdict": verdict, "source": reason}

# Gradio Interface
checker = PIBFactChecker()
with gr.Blocks(theme=gr.themes.Soft(), title="CrisisTruthAI v2.1") as demo:
    gr.Markdown("# 🛡️ CrisisTruthAI: Optimized Fact Checker")
    with gr.Row():
        with gr.Column(scale=1):
            input_box = gr.Textbox(label="Paste Claim", placeholder="e.g., Global news events...", lines=5)
            verify_btn = gr.Button("🔍 Verify", variant="primary")
        with gr.Column(scale=1):
            output_md = gr.Markdown(value="*Results will appear here...*")
            conf_bar = gr.Label(label="Confidence Level")
    verify_btn.click(checker.check_fact, inputs=input_box, outputs=[output_md, conf_bar])

if __name__ == "__main__":
    demo.launch()