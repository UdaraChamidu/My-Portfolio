import os
import requests
import base64
from google import genai
from datetime import datetime
import json

NEWS_API_KEY = os.getenv("NEWSDATA_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")  # Optional

client = genai.Client(api_key=GEMINI_API_KEY)
TEXT_MODEL = "gemini-2.5-flash-lite"
IMAGE_MODEL = "gemini-3.1-flash-image"

def fetch_news():
    url = f"https://newsdata.io/api/1/news?apikey={NEWS_API_KEY}&q=AI+ML&language=en"
    try:
        res = requests.get(url)
        res.raise_for_status()
        data = res.json()
        results = data.get("results", [])
        if not isinstance(results, list):
            print(f"Unexpected API response: {data}")
            return []
        articles = results[:5]
        return [a["title"] + ". " + a.get("description", "") for a in articles]
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

def summarize(text):
    prompt = f"Summarize this AI/ML news in 1-2 short sentences:\n\n{text}"
    try:
        response = client.models.generate_content(
            model=TEXT_MODEL,
            contents=prompt,
        )
        return response.text.strip()
    except Exception as e:
        print(f"Error summarising text: {e}")
        return "Summary unavailable."

def extract_topic(text):
    prompt = f"Read this AI/ML news and generate a short, relevant topic (max 8 words):\n\n{text}\n\nTopic:"
    try:
        response = client.models.generate_content(
            model=TEXT_MODEL,
            contents=prompt,
        )
        return response.text.strip().replace('"', '')
    except Exception as e:
        print(f"Error extracting topic: {e}")
        return "General AI/ML"

def generate_blog_image(summaries, today):
    """Generate one original cover that represents the post's actual stories."""
    news_context = "\n".join(
        f"- {item['topic']}: {item['summary']}" for item in summaries
    )
    prompt = f"""
Create a polished editorial cover image for an AI and technology news article.
Represent the following real news themes visually:
{news_context}

Use a coherent photorealistic technology-publication style and a wide 16:9
composition suitable for a blog header. Focus on the most important shared
visual theme instead of making a cluttered collage. Do not add readable text,
headlines, logos, watermarks, humanoid robots, or unrelated books.
"""

    try:
        interaction = client.interactions.create(
            model=IMAGE_MODEL,
            input=prompt,
            response_format={
                "type": "image",
                "aspect_ratio": "16:9",
                "image_size": "1K",
            },
        )
        image_data = interaction.output_image.data
        image_bytes = base64.b64decode(image_data)
        image_filename = f"{today}-ai-ml-news-cover.png"
        image_path = os.path.join("public", "blogs", image_filename)
        with open(image_path, "wb") as image_file:
            image_file.write(image_bytes)
        return f"/blogs/{image_filename}"
    except Exception as e:
        print(f"Gemini image generation error: {e}")

    if UNSPLASH_ACCESS_KEY:
        try:
            search_terms = " ".join(item["topic"] for item in summaries[:2])
            response = requests.get(
                "https://api.unsplash.com/search/photos",
                headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"},
                params={
                    "query": search_terms,
                    "per_page": 1,
                    "orientation": "landscape",
                },
                timeout=10,
            )
            response.raise_for_status()
            results = response.json().get("results", [])
            if results:
                return results[0]["urls"]["regular"]
        except Exception as e:
            print(f"Unsplash fallback error: {e}")

    return ""

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
    
    os.makedirs("public/blogs", exist_ok=True)
    image_url = generate_blog_image(summaries, today)
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
    
    
    
