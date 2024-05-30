"use server"
import prisma from "@/lib/db"
import { registerSchema } from "@/schemas/zodSchema"
import { error } from "console"
import {z} from"zod"
import bcrypt from "bcryptjs";

export async function register(values: z.infer<typeof registerSchema>) {
    const verifield = await registerSchema.safeParse(values)
    
    if (!verifield.success) {
        return{error:"quelque chose de mal s'est produit"}
    }
    const {password,email,name} = verifield.data

    const existingUser = await prisma.user.findUnique({
        where:{email}
    })
    const token = await prisma.verificationToken.findFirst({
        where:{email}
    })
    if (existingUser && token) {
        await prisma.user.delete({
            where:{email}
        })
    }
    if(existingUser && !token) {
        return{error:"le compte existe déjà"}
    }
    
    const hashpasswod = await bcrypt.hash(password,10)

    await prisma.user.create({
        data:{
            password:hashpasswod,
            email,
            name
        }
    })

    return {succes:"Un message avec un lien de confirmation vous a été envoyé par mail. Veuillez suivre ce lien pour activer votre compte."}
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
  }