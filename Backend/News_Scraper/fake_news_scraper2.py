import requests
from bs4 import BeautifulSoup
import sqlite3
import os
import re
import random
import sys
from tqdm import tqdm

# --- IMPORT LOGIC ---
# Ensuring the script can find the Fact_Checker module
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, "../../"))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

try:
    from Fact_Checker.main4_fast import PIBFactChecker
except ImportError:
    try:
        from Backend.Fact_Checker.main4_fast import PIBFactChecker
    except ImportError:
        print("⚠️ Still could not import PIBFactChecker.")

# --- CONFIGURATION ---
# Using the path from your Hackathon Trial folder
# DB_PATH = r"C:\Users\Badhri Prasath D R\Desktop\Escape Hackathon Trial\Backend\Database\fake_news_2.db"
# NEWS_DB_PATH = r"C:\Users\Badhri Prasath D R\Desktop\Escape Hackathon Trial\Backend\Database\news_articles.db"

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DB_PATH = os.path.join(BASE_DIR, "Database", "fake_news_2.db")
# NEWS_DB_PATH = os.path.join(BASE_DIR, "Database", "news_articles.db")

# --- IMPROVED CONFIGURATION ---
# This looks for the Database folder relative to the Backend root
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__)) # Backend/News_Scraper
BACKEND_ROOT = os.path.dirname(CURRENT_DIR)              # Backend/

# Now we point exactly to the right place
DB_PATH = os.path.join(BACKEND_ROOT, "Database", "fake_news_2.db")
NEWS_DB_PATH = os.path.join(BACKEND_ROOT, "Database", "news_articles.db")

def get_dynamic_metadata(title: str):
    """Categorizes the claim and assigns a random impact level."""
    title_lower = title.lower()
    categories = {
        "Health": ["health", "vaccine", "who", "medical", "garlic", "covid", "doctor"],
        "Finance": ["economy", "market", "bank", "finance", "stocks", "currency", "crypto"],
        "Environment": ["climate", "environment", "green", "pollution", "earthquake", "weather"],
        "Science": ["science", "research", "discovery", "space", "5g", "physics"],
        "Technology": ["tech", "ai", "google", "apple", "software", "digital"],
        "Legal": ["legal", "court", "law", "judge", "government", "policy"]
    }
    
    category = "General"
    for cat, keywords in categories.items():
        if any(word in title_lower for word in keywords):
            category = cat
            break
            
    impact = random.choice(["low", "medium", "high", "critical"])
    return category, impact

def init_db():
    """Initializes the integrated database schema."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS fake_claims 
                     (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                      claim TEXT, 
                      source TEXT, 
                      content TEXT,
                      label TEXT,
                      url TEXT UNIQUE,
                      category TEXT,
                      impact TEXT,
                      real_evidence TEXT,
                      verdict_score REAL)''')
    conn.commit()
    conn.close()

def scrape_politifact(pages=3):
    """Original PolitiFact scraper logic with New Metadata integration."""
    print(f"🕵️ Scraping PolitiFact...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for page in tqdm(range(1, pages + 1), desc="PolitiFact Pages"):
        url = f"https://www.politifact.com/factchecks/list/?page={page}&ruling=false"
        try:
            res = requests.get(url, timeout=10)
            soup = BeautifulSoup(res.text, 'html.parser')
            items = soup.find_all('li', class_='o-listicle__item')
            
            for item in items:
                try:
                    claim_div = item.find('div', class_='m-statement__quote')
                    claim = claim_div.text.strip()
                    author = item.find('a', class_='m-statement__name').text.strip()
                    link = "https://www.politifact.com" + claim_div.find('a')['href']
                    
                    desc = item.find('div', class_='m-statement__desc')
                    content = desc.text.strip() if desc else ""

                    # Apply integrated metadata logic
                    cat, imp = get_dynamic_metadata(claim)

                    cursor.execute("""INSERT OR IGNORE INTO fake_claims 
                                   (claim, source, content, label, url, category, impact) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?)""", 
                                   (claim, author, content, "False", link, cat, imp))
                except Exception: continue
            conn.commit()
        except Exception as e:
            print(f"PolitiFact Error on page {page}: {e}")
    conn.close()

def scrape_bbc_disinformation():
    """Original BBC scraper logic with New Metadata integration."""
    print(f"🕵️ Scraping BBC Disinformation...")
    url = "https://www.bbc.com/news/topics/cjxv13v27dyt"
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        res = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        links = soup.find_all('a', href=re.compile(r'/news/'))
        
        for link_tag in tqdm(links, desc="BBC Articles"):
            try:
                title = link_tag.get_text().strip()
                if len(title) < 25: continue 
                
                href = link_tag['href']
                full_url = href if href.startswith('http') else "https://www.bbc.com" + href
                
                # Apply integrated metadata logic
                cat, imp = get_dynamic_metadata(title)

                cursor.execute("""INSERT OR IGNORE INTO fake_claims 
                               (claim, source, content, label, url, category, impact) 
                               VALUES (?, ?, ?, ?, ?, ?, ?)""", 
                               (title, "BBC Disinformation", "Fact-check article from BBC", "False", full_url, cat, imp))
            except Exception: continue
        conn.commit()
    except Exception as e:
        print(f"BBC Error: {e}")
    conn.close()

def verify_with_pib_checker(limit=50):
    """The new AI verification logic applied to all gathered sources."""
    print(f"🛡️ Initializing PIBFactChecker for AI Cross-Verification...")
    
    try:
        checker = PIBFactChecker(db_path=NEWS_DB_PATH)
    except Exception as e:
        print(f"❌ Failed to initialize Fact Checker: {e}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Select items that have no 'real_evidence' (newly scraped)
    cursor.execute("""SELECT id, claim FROM fake_claims 
                      WHERE real_evidence IS NULL 
                      ORDER BY id DESC LIMIT ?""", (limit,))
    rows = cursor.fetchall()
    
    if not rows:
        print("✅ No new claims to verify.")
        return

    for row_id, claim in tqdm(rows, desc="AI Verifying"):
        verdict, conf_dict, reason, full_evidence = checker.verify_claim(claim)
        max_score = max(conf_dict.values()) if conf_dict else 0
        if(verdict == 'Unverifiable'):
            verdict = 'Most likely False'
        cursor.execute("""UPDATE fake_claims 
                          SET real_evidence = ?, 
                              label = ?, 
                              verdict_score = ?
                          WHERE id = ?""", 
                       (full_evidence, verdict, max_score, row_id))
    
    conn.commit()
    conn.close()
    print(f"✅ AI Verification complete for {len(rows)} items.")

if __name__ == "__main__":
    init_db()
    
    # 1. Scrape from PolitiFact (Source 1)
    scrape_politifact(pages=10)
    
    # 2. Scrape from BBC (Source 2)
    scrape_bbc_disinformation()
    
    # 3. Use AI to find 'Truth' in news_articles.db for all new items
    verify_with_pib_checker(limit=50)
    
    print(f"🚀 Integrated Pipeline Finished! Data: {DB_PATH}")