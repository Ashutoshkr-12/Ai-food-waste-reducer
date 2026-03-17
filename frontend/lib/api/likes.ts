import { apiFetch } from "./client";

export async function likeRecipe(recipe_id: string) {
    return apiFetch("/api/likes",{
        method: "POST",
        body: JSON.stringify({recipe_id}),
    })
}