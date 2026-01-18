import requests
from bs4 import BeautifulSoup
import trafilatura  
import sqlite3
import os
import threading
import logging
import sys
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm

# --- SETTINGS ---
MAX_ARTICLES_PER_SOURCE = 50
TOTAL_MAX_WORKERS = 20  

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "Database", "news_articles.db")

# DB_PATH = r'C:\Users\Badhri Prasath D R\Desktop\Escape Hackathon Trial\Backend\Database\news_articles.db'
LOG_FILE = "scraper_debug.log"

# --- FIX 1: FORCE UTF-8 FOR WINDOWS CONSOLE ---
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

# --- LOGGING SETUP ---
# FIX 2: Added 'encoding="utf-8"' to FileHandler to stop the charmap error 
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout) 
    ]
)

# --- FIX 3: SILENCE CONNECTION POOL WARNINGS ---
# We increase the pool size to match our workers
logging.getLogger("urllib3").setLevel(logging.ERROR) 

db_lock = threading.Lock()

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute('PRAGMA journal_mode=WAL;') 
    conn.execute('PRAGMA synchronous=NORMAL;')
    conn.cursor().execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            cluster_id TEXT, source TEXT, title TEXT, 
            url TEXT UNIQUE, summary TEXT, image_url TEXT, scraped_at TIMESTAMP
        )''')
    conn.commit()
    conn.close()

def get_existing_urls():
    if not os.path.exists(DB_PATH):
        return set()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT url FROM news")
    urls = {row[0] for row in cursor.fetchall()}
    conn.close()
    return urls

def fetch_and_extract(url):
    try:
        # We use a custom fetcher configuration to keep the pool quiet
        downloaded = trafilatura.fetch_url(url)
        if downloaded:
            return trafilatura.extract(downloaded)
    except Exception as e:
        logging.error(f"Extraction failed for {url}")
    return None

def process_article(name, item, existing_urls):
    url = item.link.text.strip() if item.link else None
    if not url: return None
    if url in existing_urls: return "DUPLICATE"

    title = item.title.text if item.title else "Untitled"
    content = fetch_and_extract(url)
    
    if not content and item.description:
        content = BeautifulSoup(item.description.text, 'html.parser').get_text()
    
    image_url = None
    try:
        # Check RSS item first (some feeds provide it)
        media_content = item.find('media:content') or item.find('enclosure')
        if media_content:
            image_url = media_content.get('url')
        
        # Fallback: Scrape the actual page for Open Graph image
        if not image_url:
            resp = requests.get(url, timeout=5)
            soup = BeautifulSoup(resp.content, 'html.parser')
            og_image = soup.find("meta", property="og:image")
            image_url = og_image["content"] if og_image else "https://via.placeholder.com/400x250?text=News"
    except:
        image_url = "https://via.placeholder.com/400x250?text=News"

    if content:
        return (None, name, title, url, content, image_url, datetime.now())
    return None

def scrape_all_sources(sources):
    init_db()
    existing_urls = get_existing_urls()
    all_tasks = []
    
    logging.info(f"🚀 Starting scrape for {len(sources)} sources...")
    
    for source in sources:
        try:
            # Short timeout to keep the "link gathering" phase fast
            resp = requests.get(source['rss_url'], headers={'User-Agent': 'Mozilla/5.0'}, timeout=5)
            items = BeautifulSoup(resp.content, 'xml').find_all('item')[:MAX_ARTICLES_PER_SOURCE]
            for item in items:
                all_tasks.append((source['name'], item))
        except Exception as e:
            logging.error(f"Could not load RSS for {source['name']}")

    batch_data = []
    duplicates_found = 0
    errors = 0
    
    # Process with the progress bar
    with ThreadPoolExecutor(max_workers=TOTAL_MAX_WORKERS) as executor:
        futures = [executor.submit(process_article, name, item, existing_urls) for name, item in all_tasks]
        
        for f in tqdm(as_completed(futures), total=len(futures), desc="Scraping Progress"):
            res = f.result()
            if res == "DUPLICATE":
                duplicates_found += 1
            elif res:
                batch_data.append(res)
            else:
                errors += 1

    if batch_data:
        with db_lock:
            conn = sqlite3.connect(DB_PATH)
            conn.executemany("INSERT OR IGNORE INTO news VALUES (NULL, ?,?,?,?,?,?,?)", batch_data)
            conn.commit()
            conn.close()
    
    print("\n" + "="*35)
    print(f"✅ New Articles:      {len(batch_data)}")
    print(f"⏭️ Duplicates:        {duplicates_found}")
    print(f"❌ Failures:          {errors}")
    print(f"📊 Total in DB now:   {len(get_existing_urls())}")
    print("="*35)

SOURCE_CONFIG = [
    {'name': 'BBC', 'rss_url': 'http://feeds.bbci.co.uk/news/world/rss.xml'},
    {'name': 'Times of India', 'rss_url': 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms'},
    {'name': 'The Guardian', 'rss_url': 'https://www.theguardian.com/world/rss'},
    {'name': 'The Hindu', 'rss_url': 'https://www.thehindu.com/news/national/feeder/default.rss'},
    {'name': 'Reuters', 'rss_url': 'https://www.reutersagency.com/feed/?best-sectors=news&post_type=best'},
    {'name': 'Al Jazeera', 'rss_url': 'https://www.aljazeera.com/xml/rss/all.xml'},
    {'name': 'TechCrunch', 'rss_url': 'https://techcrunch.com/feed/'},
    {'name': 'The Verge', 'rss_url': 'https://www.theverge.com/rss/index.xml'}
]

if __name__ == '__main__':
    scrape_all_sources(SOURCE_CONFIG)