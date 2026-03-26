
import { apiFetch } from "./client";

export async function getMe(token: string) {
    
    return apiFetch("/api/users/me",token)
}