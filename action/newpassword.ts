"use server"
import bcrypt from"bcryptjs"
import prisma from "@/lib/db"
import { error } from "console"

export async function newpassword({token,password}:{token:string | null,password:string}) {
    
    const verification = await prisma.resetPassworrdToken.findFirst({
        where:{token:token?.toString()}
    })
    console.log(verification)
    if(!verification){
        return undefined
    }
    const expired = new Date(verification?.expires) < new Date()

    if (expired) {
       return {error:"vous avez depasser la duree recquise pour la confirmation veiller a nouveau cree un compte"}
    }
    const user = await prisma.user.findUnique({
        where:{email:verification.email}
    })
    const hashpassword = await bcrypt.hash(password,10)

    await prisma.user.update({ 
        where:{email:verification.email},
        data:{password:hashpassword}
    })
    await prisma.resetPassworrdToken.delete({
        where:{id:verification.id}
    })
    return {succes:"mot de passe reinitialiser"}
}