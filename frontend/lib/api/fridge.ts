import { apiFetch } from "./client";

export async function getFridge() {
    return apiFetch("/api/frigde")
}


export async function saveFridge(items: any[]) {
    return apiFetch("/api/fridge", {
        method: "POST",
        body: JSON.stringify({ items }),
    });
}