import { v4 as uuidv4 } from 'uuid';
import prisma from './db';

export async function generateToken(email:string) {
    const token = uuidv4();
    const expires = new Date(new Date().getTime()+240*1000)
    
    const verificatedToken = await prisma.verificationToken.findFirst({
        where:{email}
    })
    if (verificatedToken) {
       await prisma.verificationToken.delete({
        where:{id:verificatedToken.id}
       }) 
    }
    return {
        email,
        token,
        expires
    }
}