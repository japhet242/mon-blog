"use server"

import prisma from "@/lib/db"


export async function  getPost(page=1,pageSeize=9) {
   const skip = (page-1)*pageSeize
    const posts = await prisma.post.findMany({
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
        take:pageSeize,
        skip
    })
    const totalPosts = await prisma.post.count({
        where:{
            published:true
        }
    })
    return{
        posts,
        totalPosts,
        totalPage:Math.ceil(totalPosts/pageSeize),
        currentPage:page
    }
    
}