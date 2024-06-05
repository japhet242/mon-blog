"use server"
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";


export default async function Setting(){
    const session =await auth()
  
return <div className=" pt-12">
  <div className=" flex space-x-6 mb-4">
  <div>
    <span className=" text-2xl"> bienvenue </span>: <span className=" text-xl text-orange-500">{session?.user.name}</span>
   </div>
   <div>
   <span className=" text-xl">ROLE:</span> <span className=" bg-orange-300 rounded-sm p-4">{session?.user.role}</span>
   </div>
  </div>
   
   <Button variant="link" className=" bg-slate-200">
    <Link href="/"> Aller a la page d'acceul</Link>
   </Button>
    <form
      action={async () => {
        "use server"
        await signOut()
       
      }}
      className=" my-3"
    >
      <Button type="submit" >se deconnecter</Button>
    </form>
    <div className=" rounded-xl overflow-hidden mx-2 my-2">
       {session?.user.image?.length ? <Image src={`${session.user.image}`} alt="photo" width={300} height={300}/>:null}
    </div>
   
</div>
}