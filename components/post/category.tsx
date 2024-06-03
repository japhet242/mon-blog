"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { categorySchema } from "@/schemas/zodSchema"
import { useState, useTransition } from "react"
import { ajoutCategory } from "@/action/ajoutcategory"
import { AlertDestructive } from "../ui/AlertDestructive"
import { AlertSucces } from "../ui/AlertSucces"

export function Category (){
    
    const [isPending, startTransition] = useTransition()
    const [error , setError] = useState<string |undefined>("")
    const [succes , setSucces] = useState<string |undefined>("")
   
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          name: "",
        },
      })

    function onSubmit(values: z.infer<typeof categorySchema>) {
        startTransition(() => {
            ajoutCategory(values).then(e=>{
            setError(e?.error)
            setSucces(e?.succes)
          })
          });
    }
    return (
        <div className=" w-[300px] mx-4 lg:border-l-8 lg:border-cyan-500 md:mt-6 sm:mt-6 mt-2">
            <hr />
            <h1 className=" text-2xl text-center underline mb-3">Ajouter des categories</h1>

            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la categorie</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                ajouter une categorie dans la base de donnée
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDestructive message={error}/>
        <AlertSucces message={succes}/>
        <Button type="submit">Ajouter</Button>
      </form>
    </Form>
    <div className=" mt-4 text-slate-400 px-2 bg-amber-100">
      une foie que vous avez ajouter une nouvelle categorie dans la base de donnee reactualiser la page pour que cela soit pris en compte
    </div>
        </div>
    ) 

}