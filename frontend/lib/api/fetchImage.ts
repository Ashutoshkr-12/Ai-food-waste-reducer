import { apiFetch } from "./client";

export async function fetchImage(name: string, token: string){

  const res = await apiFetch("/api/get-image",token,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  );

  const data = await res.json();

  return data.image_url;
};