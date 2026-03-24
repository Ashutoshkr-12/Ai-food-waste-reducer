
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!

export async function scanFridge(file: File, token: string){

    const formData = new FormData();
    formData.append("file",file);

    const res = await fetch(
        `${BACKEND_URL}/api/scan-fridge`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    )
    if(!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error from scan api");   
    }

    return res.json()

}