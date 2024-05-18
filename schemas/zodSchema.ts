import {z} from"zod"

export const loginSchema = z.object({
    password: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    email:z.string().email({ message: "Invalid email address" })
  })
  export const registerSchema = z.object({
    name:z.string().min(4, {
        message: "Username must be at least 4 characters.",
      }),
    password: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    email:z.string().email({ message: "Invalid email address" })
  })