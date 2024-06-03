"use client"

import { getOnePost } from "@/action/getonepost"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
    const [post , SetPost ] = useState<{
      id: string;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      content: string;
      content2: string | null;
      image: string;
      image2: string | null;
      published: boolean;
      authorId: string;
  } | null>(null)
      useEffect(()=>{
          getOnePost(params.id).then(data=>{
            SetPost(data)
          })
      },[])

    return post ? (

      post &&  
      <div className="bg-white py-24 sm:py-12 px-12">
      <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-sm mt-2">
       <time dateTime={post.updatedAt.toString()} className="text-gray-500">
         {post.updatedAt.toDateString()}
       </time>
     </div>
      {post.image && (
       <div className=" relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
         <Image
           src={post.image}
           alt={post.title}
           width={500}
           height={1000} 
           className="h-full w-full object-cover object-center bg-cover"
         />
       </div>
     )}
     <div className="group relative">
       <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
         
           <span className="absolute inset-0" />
           {post.title}
         
       </h3>
       <p className="mt-5 text-sm leading-6 text-gray-600">{post.content}</p>
     </div>
     
     {post.image && (
       <div className=" relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
         <Image
           src={`${post.image2}`}
           alt={post.title}
           width={500}
           height={1000}
           className="h-full w-full object-cover object-center bg-cover"
         />
       </div>
     )}
     <div className="group relative">
       <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
         
           <span className="absolute inset-0" />
           {post.content2}
         
       </h3>
       <p className="mt-5 text-sm leading-6 text-gray-600">{post.content}</p>
     </div>
     
   </article>
   </div>

    ) :<span className="relative flex h-3 w-full ml-6">
    <span className="animate-ping  absolute h-full w-[200px] rounded-full bg-sky-400 opacity-75 mb-3 p-2">chargement...</span>
    <span className="relative inline-flex rounded-full  h-3 w-10 bg-sky-500 p-2"></span>
  </span>
    
  }