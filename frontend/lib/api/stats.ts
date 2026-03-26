import { apiFetch } from "./client";

export async function getMeStats(token: string) {
    return apiFetch("/api/stats/me",token);
}

export async function getUserStats(id: string){
    return apiFetch(`/api/stats/${id}`)
}