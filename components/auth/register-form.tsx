"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/schemas/zodSchema"
import { login } from "@/action/login"
import { useState, useTransition } from "react"
import { AlertDestructive } from "../ui/AlertDestructive"
import { AlertSucces } from "../ui/AlertSucces"
import { register } from "@/action/register"

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error , setError] = useState<string |undefined>("")
  const [succes , setSucces] = useState<string |undefined>("")
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password:"",
      name:""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(() => {
      register(values).then(e=>{
      setError(e?.error)
      setSucces(e?.succes)
    })
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="john" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDestructive message={error}/>
        <AlertSucces message={succes}/>
        <Button type="submit">S'inscrire</Button>
      </form>
    </Form>
  )
}

