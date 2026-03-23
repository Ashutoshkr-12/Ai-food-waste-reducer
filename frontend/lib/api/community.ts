
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