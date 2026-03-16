import { SignInForm } from "@/components/LoginPage"

export default function SignInpage() {
  return (
    <div className="flex min-h-svh flex-col items-center bg-blue-300 justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <SignInForm />
      </div>
    </div>
  )
}
