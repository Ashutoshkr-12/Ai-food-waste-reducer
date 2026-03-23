
import { apiFetch } from "./client";

export async function getCommunity() {
    return apiFetch("/api/community");
}

export async function createRecipe(data: any, token: string){
    return apiFetch("/api/community/",token,{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json",
        }
        
    });
}