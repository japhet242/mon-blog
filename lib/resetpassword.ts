"use server"
import { v4 as uuidv4 } from 'uuid';
import prisma from './db';

export async function generatepasswordToken(email:string) {
    
    const token = uuidv4(); 
    const expires = new Date(new Date().getTime()+7200*1000)

    const verificatedToken = await prisma.resetPassworrdToken.findFirst({
        where:{email}
    })
    if(verificatedToken){
        await prisma.resetPassworrdToken.delete({
            where:{id:verificatedToken.id}
        })
    }
    const creatToken = await prisma.resetPassworrdToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return creatToken
    
}