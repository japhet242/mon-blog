import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {z} from"zod"
import { loginSchema } from "./schemas/zodSchema"
import prisma from "./lib/db"
import bcrypt from"bcryptjs"


export default { providers: [GitHub,google,
    Credentials({
        authorize: async (credentials) => {
            
            const valited = await loginSchema.safeParse(credentials)

            if(!valited.success) return null

            const {password,email} = valited.data

           const user = await prisma.user.findUnique({
            where:{email}
           })
          if (!user || !user.password) {
           return null
          }
          const compare = await bcrypt.compare(password,user.password)
          if (compare) {
            return user
          }
          // return user object with the their profile data
          return null
        },
      }),
] } satisfies NextAuthConfig