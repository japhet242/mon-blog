import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Social } from "@/components/ui/social"
import Link from "next/link"

export default function Register() {
  return (
    <div className="container mx-auto px-4 md:max-w-[450px]">
      <h1 className=" text-3xl mb-4">S'inscrire</h1>
      <div>
        <RegisterForm/>
      </div>
      <hr className=" mt-4 mb-4"/>
     <div>
      <Social/>
     </div>
     <div className=" mt-5">
        <Link href="/auth/login" className=" underline text-blue-400">Retour</Link>
     </div>
   
    </div>
  )
}
