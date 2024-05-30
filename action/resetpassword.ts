"use server"
import { ResetMail } from "@/app/api/resend/mailreset"
import { signIn } from "@/auth"
import prisma from "@/lib/db"
import { generatepasswordToken } from "@/lib/resetpassword"
import { resetSchema } from "@/schemas/zodSchema"
import {z} from"zod"

export async function resetpassword(values: z.infer<typeof resetSchema>) {
    const verifield = await resetSchema.safeParse(values)
    
    if(!verifield.success){
     return {error:"quelque chose de mal s'est produit"}
    }
    const email= verifield.data

    const user = await prisma.user.findUnique({
      where:{email:email?.email}
    })
    if(!user){
      return {error:"il n'y a pas de compte pour cet adresse email"}
    }
    console.log(email.email)
   const token = await generatepasswordToken(email?.email)
    await ResetMail({email:token.email,token:token.token})
    return {succes:"Un message avec un lien de confirmation vous a été envoyé par mail. Veuillez suivre ce lien pour reinitialiser votre mot de passe."}
    
  }