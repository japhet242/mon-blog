"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postSchema } from "@/schemas/zodSchema";
import { login } from "@/action/login";
import { useEffect, useState, useTransition } from "react";
import { AlertDestructive } from "../ui/AlertDestructive";
import { AlertSucces } from "../ui/AlertSucces";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { UploadComponent } from "./uploadbutton";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectcategory } from "./selectcategory";
import { postAction } from "@/action/postaction";
import { UploadButtonComponent } from "./uploadBotton";

export function PostForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>("");
  const [image2, setImage2] = useState<string | undefined>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const paramsUrl = useSearchParams().get("error");
  const router = useRouter()

  useEffect(() => {

    async function fetchCategories() {
      const data = await selectcategory();
      setCategories(data ?? []);
    }

    fetchCategories();
  }, []);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      content2: "",
      categories: "",
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    startTransition(() => {
     postAction({data:values,image,image2}).then(e=>{
      setSucces(e?.success),
      setError(e.error)
     })
     form.reset()
      console.log(values);
    });
  }

  return (
    <div>
      <h1 className="mb-4 mt-2 text-2xl">Créer un Article</h1>
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
          {image?.length ? (
            <div>
              <Image src={image} width={350} height={350} alt="image téléchargée" />
            </div>
            
          ) : (
            <UploadComponent urlimage={setImage} />
          )}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu 1</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Parlez-nous un peu de vous"
                    className="resize-y min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {image2?.length ? (
            <Image src={image2} width={350} height={350} alt="image téléchargée" />
          ) : (
            <UploadComponent urlimage={setImage2} />
          )}
          <FormField
            control={form.control}
            name="content2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu 2</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Parlez-nous un peu de vous"
                    className="resize-y min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(category => (
                      <SelectItem key={category.id} value={category.name || "pas de category"}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Vous pouvez gérer les catégories dans vos{" "} 
                  <Link href="/examples/forms">paramètres de catégorie</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDestructive message={paramsUrl === "OAuthAccountNotLinked" ? "Un compte existe déjà avec ce même email, essayez avec un autre réseau social" : error} />
          <AlertSucces message={succes} />
          <Button type="submit" className="w-full">Poster</Button>
        </form>
      </Form>
    </div>
  );
}
