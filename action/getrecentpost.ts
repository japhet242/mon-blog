"use server"

import prisma from "@/lib/db"


export async function  getRecentPost() {
  
    return await prisma.post.findFirst({
        orderBy:{
            createdAt:"desc"
        },
        include:{
            author:true,
            categories:true
        }
    })  
}