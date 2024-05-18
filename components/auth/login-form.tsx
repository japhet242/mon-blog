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
import { loginSchema } from "@/schemas/zodSchema"
import { login } from "@/action/login"
import { useState, useTransition } from "react"
import { AlertDestructive } from "../ui/AlertDestructive"
import { AlertSucces } from "../ui/AlertSucces"
import { useSearchParams } from "next/navigation"

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error , setError] = useState<string |undefined>("")
  const [succes , setSucces] = useState<string |undefined>("")
  const paramsUrl = useSearchParams().get("error")
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values).then(e=>{
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
        <AlertDestructive message={paramsUrl==="OAuthAccountNotLinked"?"un compte existe deja avec se même email esseye avec un autre réseaux social":error}/>
        <AlertSucces message={succes}/>
        <Button type="submit">Se connecter</Button>
      </form>
    </Form>
  )
}

