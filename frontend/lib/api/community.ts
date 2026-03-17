import { apiFetch } from "./client";

export async function getCommunity() {
    return apiFetch("/api/community");
}

export async function createRecipe(data: any){
    return apiFetch("/api/community",{
        method: "POST",
        body: JSON.stringify(data)
    });
}