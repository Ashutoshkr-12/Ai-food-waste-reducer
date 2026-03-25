import os
import httpx

API_KEY = os.getenv("SPOONACULAR_API_KEY")

async def search_ingredient(name: str):

    url = "https://api.spoonacular.com/food/ingredients/search"

    params = {
        "query": name,
        "number": 1,
        "apiKey": API_KEY,
    }

    async with httpx.AsyncClient() as client:
        r = await client.get(url, params=params)

    data = r.json()

    if not data.get("results"):
        return None

    img = data["results"][0]["image"]

    return f"https://spoonacular.com/cdn/ingredients_250x250/{img}"


async def search_product(name: str):

    url = "https://api.spoonacular.com/food/products/search"

    params = {
        "query": name,
        "number": 1,
        "apiKey": API_KEY,
    }

    async with httpx.AsyncClient() as client:
        r = await client.get(url, params=params)

    data = r.json()

    if not data.get("products"):
        return None

    return data["products"][0]["image"]


async def get_food_image(name: str):
    img = await search_ingredient(name)

    if img:
        return img

    img = await search_product(name)

    if img:
        return img

    return None