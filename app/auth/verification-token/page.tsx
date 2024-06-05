"use client"
import { redirect, useSearchParams } from "next/navigation"
import { Suspense, useCallback, useEffect, useState } from "react"
import { valited } from "./verifield"
import { AlertDestructive } from "@/components/ui/AlertDestructive"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Verifie() {
  return(
    <Suspense>
        <Verification/>
    </Suspense>
  )
}
function Verification() {
    const [error , setError]= useState<string | undefined>("")
    const paramsUrl = useSearchParams()
    const token =paramsUrl.get("token")
   const onSubmit= useCallback(()=>{
          valited(token).then(e=>{
            console.log(e)
            if (e?.error) {
                setError(e?.error)
            }
           
        })
    },[token])
    useEffect(()=>{
      onSubmit()
    },[onSubmit])
return error !=="" && error!==undefined ?
    <div >
        <div className=" mt-10 bg-red-100 ">
<AlertDestructive message={error}/>
        </div>
        <Button className=" mt-5 bg-slate-300 text-blue-400" variant="link" >
            <Link href={"/auth/regiseter"}>Recrée le compte</Link>
        </Button>
        
    </div> : redirect("/auth/login")
}