import os
import requests
import google.generativeai as genai
from datetime import datetime

# === Config ===
NEWS_API_KEY = os.getenv("NEWSDATA_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

def fetch_news():
    url = f"https://newsdata.io/api/1/news?apikey={NEWS_API_KEY}&q=AI+ML&language=en"
    res = requests.get(url)
    data = res.json()
    articles = data.get("results", [])[:5]  # take top 5
    return [a["title"] + ". " + a.get("description", "") for a in articles]

def summarize(text):
    prompt = f"Summarize this AI/ML news in 1-2 short sentences:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text.strip()

def create_blog():
    news = fetch_news()
    summaries = [f"- {summarize(n)}" for n in news]

    today = datetime.now().strftime("%Y-%m-%d")
    filename = f"content/blogs/{today}-ai-ml-news.md"

    os.makedirs("content/blogs", exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"---\n")
        f.write(f"title: 'AI/ML News {today}'\n")
        f.write(f"date: '{today}'\n")
        f.write(f"---\n\n")
        f.write("### 🚀 AI/ML Updates\n\n")
        f.write("\n".join(summaries))

if __name__ == "__main__":
    create_blog()
