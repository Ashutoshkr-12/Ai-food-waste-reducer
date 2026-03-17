import { SignIn } from "@clerk/nextjs";


export default function SignInPage(){
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div>
            <SignIn fallbackRedirectUrl={"/dashboard"}/>;

            </div>
        </div> 

)
}