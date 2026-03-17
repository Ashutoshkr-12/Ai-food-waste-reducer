import { auth } from "@clerk/nextjs/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!

export async function apiFetch(
    url: string,
    options?: RequestInit
){
    const session = await auth() ;

    const token = await session.getToken();
    //console.log('token from frontEnd:',token)

    const res = await fetch(
        `${BACKEND_URL}${url}`,
        {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
            cache: "no-store"
        }
    );

    if(!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.detail || "Api Error")
    }

    return res.json();
}