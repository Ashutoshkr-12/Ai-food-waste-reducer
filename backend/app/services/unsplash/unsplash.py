import os
import requests

UNSPLASH_KEY = os.getenv("UNSPLASH_ACCESS_KEY")

def fetch_image(query: str):
    url = "https://api.unsplash.com/search/photos"

    params = {
        "query": query,
        "per_page": 1
    }

    headers = {
        "Authorization": f"Client-ID {UNSPLASH_KEY}"
    }

    res = requests.get(url, headers=headers, params=params)
    data = res.json()

    if data.get("results"):
        return data["results"][0]["urls"]["regular"]