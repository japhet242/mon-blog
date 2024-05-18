import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import prisma from "./lib/db"
import NextAuth, { type DefaultSession } from "next-auth"
 
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: "USER" | "ADMIN"
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
} 

export const { handlers, auth ,signIn,signOut} = NextAuth({
    pages:{
        signIn:"/auth/login"
    },
    events:{
        async linkAccount({user,account}) {
            // Logique pour lier le compte à l'utilisateur
          await prisma.user.update({
            where:{id:user.id},
            data:{
                emailVerified:new Date()
            }
          })
          }
    },
    callbacks: {
        async signIn({user,account}){

            if(account?.provider!=='credentials') return true
            const validated = await prisma.user.findUnique({
                where:{id:user.id}
            })
            if (!validated?.emailVerified) {
                return false
            }
            return true
        },
        async jwt({ token }) {
            if(!token.sub) return token
           const user = await prisma.user.findUnique({
            where:{id:token.sub}
           })
           if(!user || !user.role) return token
           token.role =user.role
          return token
        },
       async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }
            if (session.user && token.role) {
                session.user.role = token.role as "USER"|"ADMIN"
            }
          
          return session
        },
      },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})