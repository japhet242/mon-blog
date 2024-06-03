"use server"
import prisma from "@/lib/db"
import { registerSchema } from "@/schemas/zodSchema"
import { z } from "zod"
import bcrypt from "bcryptjs"

export async function register(values: z.infer<typeof registerSchema>) {
    try {
        const verified = registerSchema.safeParse(values)
        
        if (!verified.success) {
            return { error: "Quelque chose de mal s'est produit: données invalides." }
        }
        
        const { password, email, name } = verified.data

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        const token = await prisma.verificationToken.findFirst({
            where: { email }
        })

        if (existingUser && token) {
            await prisma.user.delete({
                where: { email }
            })
        } else if (existingUser && !token) {
            return { error: "Le compte existe déjà." }
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                password: hashedPassword,
                email,
                name
            }
        })

        // Simuler l'envoi d'un e-mail de confirmation
        // await sendConfirmationEmail(email)

        return { success: "Un message avec un lien de confirmation vous a été envoyé par mail. Veuillez suivre ce lien pour activer votre compte." }
    } catch (err) {
        console.error("Erreur lors de l'enregistrement :", err)
        return { error: "Une erreur interne s'est produite. Veuillez réessayer plus tard." }
    }
}
