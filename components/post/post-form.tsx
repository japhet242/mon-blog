"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"
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
import { postSchema } from "@/schemas/zodSchema"
import { login } from "@/action/login"
import { ReactNode, useEffect, useState, useTransition } from "react"
import { AlertDestructive } from "../ui/AlertDestructive"
import { AlertSucces } from "../ui/AlertSucces"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { UploadButton } from "@/utils/uploadthing"
import { UploadComponent } from "./uploadbutton"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { selectcategory } from "./selectcategory"


export function PostForm() {
  const [isPending, startTransition] = useTransition();
  const [error , setError] = useState<string |undefined>("")
  const [succes , setSucces] = useState<string |undefined>("")
  const [image , setImage] = useState<string |undefined>("")
  const [image2 , setImage2] = useState<string |undefined>("")
  const [categories, setCategories] = useState<{ id: string; name: string; }[] | undefined>([]);
  const paramsUrl = useSearchParams().get("error")

  useEffect(() => {
    async function fetchCategories() {
      const data = await selectcategory();
      setCategories(data);
    }

    fetchCategories();
  }, []);;
 console.log(categories)
  // 1. Define your form.
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content:"",
      content2:"",
      image:"",
      image2:""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof postSchema>) {
    startTransition(() => {
    //   login(values).then(e=>{
    //   setError(e?.error)
    //   setSucces(e?.succes)
    // })
    });
  }
  return (
    <div>
      <h1 className=" mb-4 mt-2 text-2xl">  Cree un Article</h1>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="le shot tv" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
{/* uploadthing */}
{image?.length ?
 <Image src={image} width={350} height={350} alt={image} /> :
<UploadComponent urlimage={setImage}/>
}
         <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* image2 */}
        {image2?.length ?
 <Image src={image2} width={350} height={350} alt={image2} /> :
<UploadComponent urlimage={setImage2}/>
}
         <FormField
          control={form.control}
          name="content2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu2</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDestructive message={paramsUrl==="OAuthAccountNotLinked"?"un compte existe deja avec se même email esseye avec un autre réseaux social":error}/>
        <AlertSucces message={succes}/>

        <Button type="submit" className=" w-full">Poster</Button>
      </form>
    </Form>
   

    </div>
   
  )
}

