"use server"
import { signIn } from "@/auth"
import prisma from "@/lib/db"
import { loginSchema } from "@/schemas/zodSchema"
import { error } from "console"
import {z} from"zod"

export async function login(values: z.infer<typeof loginSchema>) {
    const verifield = await loginSchema.safeParse(values)
    
    console.log(values)
    if (!verifield.success) {
        return{error:"quelque chose de mal s'est produit"}
    }
    const {password,email} = verifield.data

    const validated = await prisma.user.findUnique({
        where:{email}
    })
    if(!validated) {
        return {error:"le compte n'existe pas"}
    }
    if (!validated.emailVerified) {
        return {succes:"email de confirmation evonyer"}
    }

try {
   const connected = await signIn("credentials",{
       password,
       email,
       redirectTo:"/settings"
    })
    return {succes:"email envoyer"}
} catch (e) {

}
  }