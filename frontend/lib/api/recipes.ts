import { apiFetch } from "./client";

export async function suggestRecipes(token: string) {
    return apiFetch("/api/recipes/suggest",token,{
        method: "POST"
    });
}