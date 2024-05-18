import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { Social } from "@/components/ui/social"
import Link from "next/link"

export default function Login() {
  return (
    <div className="container mx-auto px-4 md:max-w-[450px]">
      <h1 className=" text-3xl mb-4">Se connecter</h1>
      <div>
        <LoginForm/>
      </div>
      <hr className=" mt-4 mb-4"/>
     <div>
      <Social/>
     </div>
     <div className=" mt-4">
      N'as-tu pas un compte? :<Link href="/auth/register" className=" text-blue-500"> crée un compte</Link>
     </div>
    </div>
  )
}
