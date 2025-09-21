import os
import requests
import google.generativeai as genai
from datetime import datetime
import json

NEWS_API_KEY = os.getenv("NEWSDATA_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

def fetch_news():
    url = f"https://newsdata.io/api/1/news?apikey={NEWS_API_KEY}&q=AI+ML&language=en"
    res = requests.get(url)
    data = res.json()
    articles = data.get("results", [])[:5]
    return [a["title"] + ". " + a.get("description", "") for a in articles]

def summarize(text):
    prompt = f"Summarize this AI/ML news in 1-2 short sentences:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text.strip()

def extract_topic(text):
    prompt = f"Read this AI/ML news and generate a short, relevant topic (max 8 words):\n\n{text}\n\nTopic:"
    response = model.generate_content(prompt)
    return response.text.strip().replace('"', '')

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

    os.makedirs("public/blogs", exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write("---\n")
        f.write(f"title: '{topic}'\n")
        f.write(f"date: '{today}'\n")
        f.write(f"topics:\n")
        for item in summaries:
            f.write(f"  - \"{item['topic']}\"\n")
        f.write("---\n\n")
        # f.write("### 🚀 AI/ML Updates\n\n")
        for item in summaries:
            f.write(f"**{item['topic']}**\n\n{item['summary']}\n\n")

    blog_files = [f for f in os.listdir("public/blogs") if f.endswith(".md")]
    blog_files.sort(reverse=True)
    with open("public/blogs/blogs.json", "w", encoding="utf-8") as f:
        json.dump(blog_files, f)

if __name__ == "__main__":
    create_blog()
    
    
    