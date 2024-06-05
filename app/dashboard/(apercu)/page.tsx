"use server";
import { PostForm } from "@/components/post/post-form";
import { auth } from "@/auth";
import { Category } from "@/components/post/category";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();

  return (
    <div className="container mx-auto px-5 md:container md:mx-auto lg:flex">
      <Suspense>
        <PostForm />
      </Suspense>
      
      <Category />
      {/* <div className="mt-11"> 
        {JSON.stringify(session?.user)}
      </div> */}
    </div>
  );
}
