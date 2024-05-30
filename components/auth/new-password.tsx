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
import { newpasswordSchema } from "@/schemas/zodSchema"
import { resetpassword } from "@/action/resetpassword"
import { AlertDestructive } from "../ui/AlertDestructive"
import { AlertSucces } from "../ui/AlertSucces"
import { useState, useTransition } from "react"
import { newpassword } from "@/action/newpassword"
import { useSearchParams } from "next/navigation"


export function NewPasswordForm() {
    const [isPending, startTransition] = useTransition();
  const [error , setError] = useState<string |undefined>("")
  const [succes , setSucces] = useState<string |undefined>("")
  const paramsUrl = useSearchParams().get("token")
  // 1. Define your form.
  const form = useForm<z.infer<typeof newpasswordSchema>>({
    resolver: zodResolver(newpasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof newpasswordSchema>) {
const token=paramsUrl
        startTransition(() => {
            newpassword({password:values.password,token}).then(e=>{
                // setError(e?.error)
                    setSucces(e?.succes)
                  });
            })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="*********" {...field} />
              </FormControl>
              <FormDescription>
                metter votre nouveau mot de passe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDestructive message={error}/>
        <AlertSucces message={succes}/>
        <Button type="submit" variant="ghost" className=" shadow-md bg-yellow-100">M'envoyer les instructions
</Button>
      </form>
    </Form>
  )
}
