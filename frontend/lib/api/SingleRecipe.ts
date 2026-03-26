import { apiFetch } from "./client";

export const getRecipeById = (recipe_id: number) => {
    const res = apiFetch(`/api/recipe/${recipe_id}`)
        
    return res;
}