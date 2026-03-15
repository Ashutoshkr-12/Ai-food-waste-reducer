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

Ingrediants:
{names}

Priority ingrediants are first.

Suggest 3 recipes that i can make in 10 minutes, 20 minutes and 30 minutes.
Return JSON:

[
{{
"title": "",
"ingrediant":[],
"steps":[],
"time":""
}}]
 """
    
    response = model.generate_content(prompt)

    text = response.text.replace("```json","").replace("```","").strip()

    return json.loads(text)