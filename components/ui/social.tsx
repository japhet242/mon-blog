"use client"
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./button";
export function Social() {
    const handleClick = (provider:"github"|"google")=>{
            signIn(provider)
    }
    return ( 
        <div className=" mt-8 flex w-full">
            <Button className=" flex justify-between p-2 w-full mx-2 shadow-lg rounded-md" variant="ghost" onClick={()=>handleClick("github")}><FaGithub /> <span>Github</span></Button>
            <Button className=" flex justify-between p-2 w-full shadow-lg rounded-md" variant="ghost" onClick={()=>handleClick("google")}><FcGoogle /> <span>Google</span></Button>
        </div>
    )
}