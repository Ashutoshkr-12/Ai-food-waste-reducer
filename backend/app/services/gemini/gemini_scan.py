import google.generativeai as genai
import os
import json
from typing import List, Dict
from datetime import date

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

def clean_string(value):
    if not value:
        return value
    if isinstance(value, str):
        return value.strip().strip('"').strip("'")
    return value

today = date.today().isoformat()


async def detect_items(
        image_bytes:  bytes,
) -> List[dict]:
    
    try:

        prompt = f"""

You are an AI that detects food items from a fridge image.

Today's exact date is: {today}

Return ONLY a valid JSON array of objects. Do NOT wrap the response in markdown blocks like ```json.

Rules:
- Detect food items clearly visible in the image.
- Add "quantity": 1 for each item.
- Calculate a realistic "expiry_date" for each specific item starting from today ({today}). 
  (For example, fresh milk expires in 5-7 days, while sauces take months).
- "expiry_date" must strictly be in YYYY-MM-DD format.
- Do NOT generate or return any image URLs.

Format:
[
  {{
    "name": "Item Name",
    "quantity": 1,
    "expiry_date": "YYYY-MM-DD"
  }}
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

        text = text.replace("```json", "").replace("```","").strip()

        textData = json.loads(text)

        if not isinstance(textData, list):
            return []
        
        data =[]

        for item in textData:
            name = clean_string(item.get("name"))
            quantity = item.get("quantity", 1)
            expiry_date = clean_string(item.get("expiry_date"))
            image_url = clean_string(item.get("image_url"))

            data.append(
                {
                    "name": name,
                    "quantity": quantity,
                    "expiry_date": expiry_date,
                    "image_url": image_url,
                }
            )
        
        return data

    except Exception as e:
        print("Gemini error:",e)
        return []