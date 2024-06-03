"use server"

import prisma from "@/lib/db"


export async function getOnePost(id:string) {
   
    return await prisma.post.findFirst({
        where:{id}
    })
}