import google.generativeai as genai
import os
import json

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

async def suggest_recipes(items):

    names = [i.name for i in items]

    prompt = f"""
You are a cooking assistant.

Ingredients:
{names}

Priority ingredients are first.

Suggest 3 recipes.

Each recipe must include:
- title
- search_query (for image search)
- ingredients
- steps
- time_minutes

Return ONLY JSON.

[
  {{
    "title": "",
    "search_query": "",
    "ingredients": [],
    "steps": [],
    "time_minutes": 10,
  }}
]
"""
    response = model.generate_content(prompt)

    text = response.text.replace("```json","").replace("```","").strip()

    return json.loads(text)