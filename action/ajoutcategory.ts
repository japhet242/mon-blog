"use server"
import prisma from "@/lib/db";
import { categorySchema } from "@/schemas/zodSchema";
import { error } from "console";
import {z} from"zod"

export async function ajoutCategory(values: z.infer<typeof categorySchema>) {
   
    const valited = await categorySchema.safeParse(values)
    
    if (valited.success) {
        const {name} = valited.data
        const verifield = await prisma.category.findFirst({
            where:{name}
        })
        if (verifield){
            return{error :"la categorie existe deja"}
        }
        await prisma.category.create({
            data:{
                name
            }
        })
        return {succes:"gategorie ajouté"}
    }

   

}