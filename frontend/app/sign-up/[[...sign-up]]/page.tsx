import { SignUp } from "@clerk/nextjs";


export default function SignUpPage(){
    return (
    <div className="w-full h-screen flex items-center justify-center">
        <div>
        <SignUp fallbackRedirectUrl={"/dashboard"} />
        </div>
    </div>
    )
}