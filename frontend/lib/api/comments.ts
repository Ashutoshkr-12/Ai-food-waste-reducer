import { apiFetch } from "./client";

export async function addComment(id: number,text: string,token: string) {
    // console.log(id,text,token)
    return apiFetch("/api/comments/",token,{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({id,text}),
    })
}

export async function getComment(id:number){
    const res = await apiFetch(`/api/comments/${id}`)

    return res;
}