"use server"

import prisma from "@/lib/db"


export async function  getPost() {
   
    return await prisma.post.findMany({
        where:{
            published:true
        },
        include:{
            categories:true,
            author:true
        },
        orderBy:{
            createdAt:"desc"
        },
        take:9
    })
    
}