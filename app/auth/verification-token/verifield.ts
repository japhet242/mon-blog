"use server"

import prisma from "@/lib/db"
import { error } from "console"

export async function valited(token:string | null) {
    
    const verification = await prisma.verificationToken.findFirst({
        where:{token:token?.toString()}
    })
    if(!verification){
        return undefined
    }
    const expired = new Date(verification?.expires) < new Date()
console.log(new Date(verification?.expires))
    if (expired) {
       return {error:"vous avez depasser la duree recquise pour la confirmation veiller a nouveau cree un compte"}
    }
    const user = await prisma.user.findUnique({
        where:{email:verification.email}
    })

    if(user?.emailVerified) return

    await prisma.user.update({ 
        where:{email:verification.email},
        data:{emailVerified:new Date()}
    })
    await prisma.verificationToken.delete({
        where:{id:verification.id}
    })
    return {succes:"compte cree veiller vous conneter"}
}