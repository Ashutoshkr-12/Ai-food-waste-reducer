import google.generativeai as genai
import os
import json
from typing import List, Dict

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash-latest")

async def detect_items(
        image_bytes:  bytes,
) -> List[dict]:
    
    try:

        prompt = """
You are an AI that detects food items from a fridge image.

Return ONLY valid JSON.

Rules:
- Detect food items
- Add quantity = 1
- Add expiry_date based on today
- expiry_date must be in YYYY-MM-DD
- Return array of objects

Format:

[
  {"name":"milk","quantity":1,"expiry_date":"2026-03-20"},
  {"name":"egg","quantity":1,"expiry_date":"2026-03-22"}
]

Return only JSON.
"""
        response = model.generate_content(
            [
                prompt,
                {
                    "mime_type": "image/jpeg",
                    "data": image_bytes,
                }
            ]
        )

        text = response.text.strip()

        #remove markdown if exists

        text = text.replace("```json", "").replace("```","").strip()

        data = json.loads(text)

        if not isinstance(data, list):
            return []
        
        return data

    except Exception as e:
        print("Gemini error:",e)
        return []