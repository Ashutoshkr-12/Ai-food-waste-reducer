import { apiFetch } from "./client";

export async function getFridge() {
    return apiFetch("/api/frigde")
}


export async function saveFridge(items: any[], token: string) {
    return apiFetch("/api/fridge",token,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
    });
}