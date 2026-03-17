import { apiFetch } from "./client";

export async function getMeStats() {
    return apiFetch("/api/stats/me");
}

export async function getUserStats(id: string){
    return apiFetch(`/api/stats/${id}`)
}