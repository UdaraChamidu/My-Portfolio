import requests
import os

images = {
    "lkyard.png": "https://github.com/user-attachments/assets/e65c0c9f-6883-490b-9993-979a04f26b5d",
    "velox.png": "https://github.com/user-attachments/assets/15632fbe-780c-48c2-a931-16474fb855ae",
    "hr-leave.png": "https://github.com/user-attachments/assets/f76783d6-dbb5-4424-81d3-3fb2e374528c"
}

target_dir = r"d:\My-Portfolio\public\projects"
os.makedirs(target_dir, exist_ok=True)

for name, url in images.items():
    print(f"Downloading {name} from {url}...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1"
    }
    response = requests.get(url, headers=headers, stream=True)
    if response.status_code == 200:
        with open(os.path.join(target_dir, name), 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Successfully saved {name}")
    else:
        print(f"Failed to download {name}: {response.status_code}")
