import { auth } from "@clerk/nextjs/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!

export async function scanFridge(file: File){
    const { getToken } = await auth();

    const token = await getToken();

    const formData = new FormData();
    formData.append("file",file);

    const res = await fetch(
        `${BACKEND_URL}/api/scan`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    )

    return res.json();
}