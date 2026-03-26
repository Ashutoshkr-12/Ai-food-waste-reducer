import { apiFetch } from "./client";

export async function likeRecipe(recipe_id: number,token: string) {
    return apiFetch("/api/likes/",token,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({recipe_id}),
    })
}