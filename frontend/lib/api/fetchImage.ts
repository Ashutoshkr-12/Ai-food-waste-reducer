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


  return res.image_url;
};