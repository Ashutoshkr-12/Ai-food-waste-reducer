import { apiFetch } from "./client";

export async function getMe() {
    return apiFetch("/api/users/me")
}