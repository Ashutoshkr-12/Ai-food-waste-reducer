import { apiFetch } from "./client";

export async function suggestRecipes() {
    return apiFetch("/recipes/suggest",{
        method: "POST"
    });
}