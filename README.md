# CrisisTruth

**AI-Powered Crisis Misinformation Detection and Verification Platform**

CrisisTruth is a real-time, AI-driven system built to detect, verify, and counter the spread of misinformation during crisis events. It combines natural language inference, vector-based semantic search, and automated news aggregation to deliver accurate verdicts on claims — helping journalists, researchers, and the public distinguish verified information from harmful disinformation in high-pressure situations.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [AI Pipeline](#ai-pipeline)
- [API Reference](#api-reference)
- [Installation and Setup](#installation-and-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Problem Statement

During crises — natural disasters, political unrest, public health emergencies — misinformation spreads faster than verified reporting. Traditional fact-checking is manual, slow, and cannot scale to the volume of claims circulating across social media and news platforms in real time. There is a critical need for an automated system capable of ingesting live news, cross-referencing claims against verified sources, and returning trustworthy verdicts within seconds.

---

## Solution Overview

CrisisTruth automates the full fact-checking pipeline:

1. A background scraper continuously aggregates real news from authoritative RSS sources and fake/misleading claims from established fact-checking platforms.
2. All verified articles are embedded into a persistent vector database using a transformer-based sentence embedding model.
3. When a claim is submitted, the system retrieves the most semantically relevant evidence, then applies a Natural Language Inference cross-encoder to classify the relationship between the claim and the evidence as entailment (True), contradiction (False), or neutral (Unverifiable).
4. A React-based dashboard surfaces results, trending misinformation, platform toxicity analysis, and category breakdowns in a unified interface.

---

## Key Features

**Automated News Ingestion**
Real news is scraped from multiple authoritative RSS feeds every two hours via a background scheduler. Fake and misleading claims are sourced from Politifact and BBC Disinformation tracking.

**Semantic Fact Verification**
Claims are matched against a ChromaDB vector store using sentence-level embeddings, then re-ranked using a cross-encoder NLI model for high-precision verdicts.

**Incremental Vector Sync**
On startup and after every scrape cycle, only new articles are embedded and added to the vector store. Already-indexed documents are skipped, keeping sync times fast regardless of database size.

**Real-Time Dashboard**
The frontend provides KPI statistics, category distribution charts, platform toxicity rankings, and trending fake and real news feeds — all updated from live backend data.

**Conversational Fact-Check Interface**
A chatbot page allows users to submit arbitrary claims and receive structured verdicts with reasoning and confidence scores.

**Dockerized Deployment**
The backend ships as a Docker container configured for Hugging Face Spaces (port 7860) and is CORS-enabled for Netlify-hosted frontends.

---

## System Architecture

```
User Interface (React + TypeScript + Vite)
        |
        | HTTP (REST)
        v
FastAPI Backend (Python 3.10)
        |
        |-- /verify        --> PIBFactChecker (NLI Pipeline)
        |-- /real-news     --> SQLite: news_articles.db
        |-- /fake-news     --> SQLite: fake_news_2.db
        |-- /dashboard-stats --> Aggregated from both DBs
        |
        |-- Background Scheduler (APScheduler, every 2 hours)
                |-- news_scraper_AI2.py   --> Scrapes RSS feeds --> news_articles.db
                |-- fake_news_scraper2.py --> Scrapes Politifact + BBC --> fake_news_2.db
                |-- PIBFactChecker.sync_incremental() --> ChromaDB vector store update

AI Fact-Checking Pipeline
        |
        |-- Sentence Embedding: all-MiniLM-L6-v2 (SentenceTransformers)
        |-- Vector Store: ChromaDB (persistent local)
        |-- NLI Re-ranking: cross-encoder/nli-deberta-v3-small (CrossEncoder)
```

---

## Technology Stack

### Backend

| Component | Technology |
|---|---|
| Web Framework | FastAPI 0.128 |
| Language | Python 3.10 |
| Sentence Embeddings | SentenceTransformers (all-MiniLM-L6-v2) |
| NLI Cross-Encoder | CrossEncoder (nli-deberta-v3-small) |
| Vector Database | ChromaDB 1.4 |
| Relational Database | SQLite (WAL mode) |
| Task Scheduling | APScheduler |
| Web Scraping | Trafilatura, BeautifulSoup4, Requests |
| GPU Support | PyTorch (CUDA auto-detection) |
| Containerization | Docker |

### Frontend

| Component | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Charts | Recharts |
| HTTP Client | Axios |
| Icons | Lucide React |

---

## AI Pipeline

### Embedding and Indexing

Articles are encoded using `all-MiniLM-L6-v2`, a lightweight but highly effective sentence transformer model. Embeddings are stored in a ChromaDB persistent collection (`news_facts`). Each document is identified by an MD5 hash of its URL, ensuring idempotent upserts and preventing duplicate indexing.

### Claim Verification

When a claim is submitted to `/verify`:

1. ChromaDB retrieves the top 5 most semantically similar articles using cosine similarity.
2. The top-ranked article is paired with the input claim and passed to the `nli-deberta-v3-small` cross-encoder.
3. The cross-encoder outputs logits for three classes: Contradiction, Entailment, Neutral. These are converted to probabilities via softmax.
4. Lexical and fuzzy similarity checks (via `SequenceMatcher`) are applied to boost confidence when near-literal matches are found.
5. A final verdict of True, False, or Unverifiable is returned alongside a confidence dictionary and source attribution.

### Verdict Logic

| Condition | Verdict |
|---|---|
| Entailment probability > 0.5 | True |
| Contradiction probability > 0.5 | False |
| No dominant class | Unverifiable |
| Literal or fuzzy match > 0.75 | Confidence boosted to True |

---

## API Reference

### POST /verify

Verifies a claim against the vector knowledge base.

**Request Body**
```json
{
  "claim": "The government has approved a new vaccine for public use."
}
```

**Response**
```json
{
  "verdict": "True",
  "reasoning": "Confirmed by PIB Official. Direct match found.",
  "scores": {
    "True (Match)": 0.91,
    "False (Conflict)": 0.06,
    "Neutral (Unrelated)": 0.03
  }
}
```

### GET /real-news

Returns the 50 most recently scraped verified articles with metadata including category, impact level, source, and image URL.

### GET /fake-news

Returns the 50 most recently detected fake or misleading claims with verdict labels, severity ratings, and counter-evidence.

### GET /dashboard-stats

Returns aggregated statistics including total article counts, category distribution, platform toxicity rankings, and top trending items from both databases.

---

## Installation and Setup

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- Git

### Backend

```bash
git clone https://github.com/your-org/crisis-truth.git
cd crisis-truth/Backend

pip install -r requirements.txt

python main.py
```

The backend starts on `http://localhost:7860` by default. The port can be overridden via the `PORT` environment variable.

On first startup, the system initializes ChromaDB, loads the sentence transformer and cross-encoder models, and performs an incremental sync from the SQLite database into the vector store. This may take 1 to 3 minutes depending on hardware and database size.

### Frontend

```bash
cd Frontend/sample/front_end

npm install

npm run dev
```

The development server starts on `http://localhost:5173`.

To point the frontend at your backend, update the base API URL in `src/components/services/api.ts`.

---

## Deployment

### Docker (Backend)

```bash
cd Backend
docker build -t crisis-truth-api .
docker run -p 7860:7860 crisis-truth-api
```

The Dockerfile uses `python:3.10-slim`, installs system build dependencies, and runs `main.py` directly.

### Hugging Face Spaces

The backend is configured for deployment on Hugging Face Spaces using the Docker SDK. The `README.md` at the repository root contains the required Spaces metadata:

```yaml
title: Crisis Truth API
emoji: shield
sdk: docker
app_port: 7860
```

### Frontend (Netlify / Vercel)

```bash
cd Frontend/sample/front_end
npm run build
```

The `dist/` folder can be deployed to any static hosting provider. A `vercel.json` is included for Vercel deployments with SPA routing support.

---

## Project Structure

```
crisis-truth-vercel-main/
|
|-- Backend/
|   |-- main.py                          # FastAPI application and all REST endpoints
|   |-- Dockerfile                       # Container configuration for HF Spaces
|   |-- requirements.txt                 # Minimal runtime dependencies
|   |-- backend_requirements.txt         # Pinned full dependency lockfile
|   |
|   |-- Fact_Checker/
|   |   |-- main4_fast.py                # PIBFactChecker: embeddings, ChromaDB, NLI cross-encoder
|   |
|   |-- News_Scraper/
|   |   |-- news_scraper_AI2.py          # RSS scraper for verified news sources
|   |   |-- fake_news_scraper2.py        # Politifact and BBC disinformation scraper
|   |
|   |-- Database/
|       |-- news_articles.db             # SQLite: verified real news articles
|       |-- fake_news_2.db               # SQLite: detected fake and misleading claims
|
|-- Frontend/
|   |-- sample/
|       |-- front_end/
|           |-- src/
|           |   |-- components/
|           |   |   |-- pages/           # Dashboard, FakeNews, RealNews, ChatbotPage
|           |   |   |-- charts/          # BarChart, LineChart (Recharts-based)
|           |   |   |-- common/          # Navbar, Footer, Sidebar, SearchBar, Loader
|           |   |   |-- news/            # FakeNewsCard, RealNewsCard, EvidenceBox
|           |   |   |-- chatbot/         # Chatbot UI components
|           |   |   |-- services/        # API service layer (api.ts, newsService.ts)
|           |   |   |-- styles/          # Global CSS, theme variables
|           |   |-- routes.tsx           # Application route definitions
|           |   |-- main.tsx             # React entry point
|           |-- vite.config.ts
|           |-- vercel.json
|
|-- Dockerfile                           # Root-level Docker config
|-- README.md                            # This file
```

---

## Limitations and Known Issues

- The ChromaDB path is relative (`./chroma_db`) and must be writable at runtime. In containerized environments, this directory is ephemeral unless a volume is mounted.
- The service layer files (`api.ts`, `newsService.ts`, `chatbotService.ts`) require implementation to connect frontend pages to the live backend.
- CORS is currently restricted to `localhost:5173` and the Netlify deployment URL. Additional origins must be added in `main.py` before deploying to new environments.
- The Gradio demo interface in `main4_fast.py` should not be launched when the module is imported by FastAPI. The `demo.launch()` call at the bottom of the file is guarded by `if __name__ == "__main__"` and does not execute during normal server operation.

---

## License

This project was developed as part of a competitive hackathon submission. All rights reserved by the authors.
