"use server"

import prisma from "@/lib/db"
import { promises } from "fs"

export async function selectcategory(){
    
    const category = await prisma.category.findMany()

    if (category) {    
       
         return category
    }
   

}