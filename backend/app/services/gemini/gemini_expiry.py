import google.generativeai as genai
import os
import json

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
IMAGEKIT_ID = os.getenv("IMAGEKIT_ID") 

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

# 3. Main Detect Items Function
async def get_expiry_dates(
       items: list[str],
):
    try:
        prompt = f"""
for each food item give expiry days in fridge.
items: {items}

Return JSON array of objects. Do NOT wrap the response in markdown blocks like ```json.

Rules:
- give a realistic "days of expiry" for each specific item starting from today. 
  (For example, fresh milk expires in 5-7 days, while sauces take months).

Format:
[
  {{
    "item": "Egg",
    "days": "7"
  }},
  {{
    "item": "Milk",
    "days": "3"
  }}
]
"""
      
        response = await model.generate_content_async(prompt)

        text = response.text.strip()
        text = text.replace("```json", "").replace("```","").strip()
        return json.loads(text)

    except Exception as e:
        print("Gemini or Processing error:", e)
        return []