
import { apiFetch } from "./client";

export async function getCommunityRecipe() {
    return apiFetch("/api/community/");
}

export async function createRecipe(formData: any, token: string){
    return apiFetch("/api/community/",token,{
        method: "POST",
        body: formData,
    });
}

export async function getMyRecipes(token: string) {
    return apiFetch("/api/my-recipes",token)
    
}