import os
import requests
import google.generativeai as genai
from datetime import datetime
import json
import hashlib

NEWS_API_KEY = os.getenv("NEWSDATA_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")  # Optional

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash-lite")

def fetch_news():
    url = f"https://newsdata.io/api/1/news?apikey={NEWS_API_KEY}&q=AI+ML&language=en"
    res = requests.get(url)
    data = res.json()
    results = data.get("results", [])
    if not isinstance(results, list):
        print(f"Unexpected API response: {data}")
        return []
    articles = results[:5]
    return [a["title"] + ". " + a.get("description", "") for a in articles]

def summarize(text):
    prompt = f"Summarize this AI/ML news in 1-2 short sentences:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text.strip()

def extract_topic(text):
    prompt = f"Read this AI/ML news and generate a short, relevant topic (max 8 words):\n\n{text}\n\nTopic:"
    response = model.generate_content(prompt)
    return response.text.strip().replace('"', '')

def generate_image_url(title):
    """
    Generate an image URL for the blog post.
    Uses Unsplash API if available, otherwise falls back to a deterministic placeholder.
    """
    # Generate search query from title
    search_query = title.replace(":", "").replace(" vs ", " ").replace("  ", " ").strip()
    # Limit to first few words for better results
    search_terms = " ".join(search_query.split()[:4])
    
    if UNSPLASH_ACCESS_KEY:
        try:
            # Use Unsplash API to get a relevant image
            url = f"https://api.unsplash.com/search/photos"
            headers = {"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"}
            params = {
                "query": f"{search_terms} AI technology",
                "per_page": 1,
                "orientation": "landscape"
            }
            response = requests.get(url, headers=headers, params=params, timeout=5)
            if response.status_code == 200:
                data = response.json()
                if data.get("results") and len(data["results"]) > 0:
                    return data["results"][0]["urls"]["regular"]
        except Exception as e:
            print(f"Unsplash API error: {e}")
    
    # Fallback: Use deterministic placeholder based on title hash
    # This ensures the same title always gets the same image
    title_hash = hashlib.md5(title.encode()).hexdigest()
    seed = int(title_hash[:8], 16) % 1000
    return f"https://picsum.photos/seed/{seed}/1200/600"

def create_blog():
    news = fetch_news()
    summaries = []
    topics = []

    for n in news:
        summary = summarize(n)
        topic = extract_topic(n)
        summaries.append({"topic": topic, "summary": summary})

    today = datetime.now().strftime("%Y-%m-%d")
    filename = f"public/blogs/{today}-ai-ml-news.md"
    
    # Generate main topic from first summary (or use the most common topic)
    main_topic = summaries[0]["topic"] if summaries else "AI/ML News"
    
    # Generate image URL for the blog
    image_url = generate_image_url(main_topic)

    os.makedirs("public/blogs", exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write("---\n")
        f.write(f"title: '{main_topic}'\n")
        f.write(f"date: '{today}'\n")
        f.write(f"imageUrl: '{image_url}'\n")
        f.write(f"topics:\n")
        for item in summaries:
            f.write(f"  - \"{item['topic']}\"\n")
        f.write("---\n\n")
        f.write("# AI/ML News Updates\n\n")
        f.write("Stay informed with the latest developments in artificial intelligence and machine learning.\n\n")
        f.write("---\n\n")
        
        for idx, item in enumerate(summaries, 1):
            f.write(f"## {item['topic']}\n\n")
            f.write(f"{item['summary']}\n\n")
            if idx < len(summaries):
                f.write("---\n\n")

    blog_files = [f for f in os.listdir("public/blogs") if f.endswith(".md")]
    blog_files.sort(reverse=True)
    with open("public/blogs/blogs.json", "w", encoding="utf-8") as f:
        json.dump(blog_files, f)

if __name__ == "__main__":
    create_blog()
    
    
    
