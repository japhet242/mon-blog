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
  export const postSchema =  z.object({
    title:z.string().min(4, {
        message: "must be at least 4 characters.",
      }),
    content: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    content2: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }).optional(),
   categories :z.string(),
  })
  export const newpasswordSchema = z.object({
    password:z.string().min(5,{message:"must be at least 5 characters."})
  })
  export const resetSchema = z.object({
    email:z.string().email({ message: "Invalid email address" })
  })
  export const categorySchema =z.object({
    name:z.string().min(3,{message:"must be at least 3 characters."})
  })
