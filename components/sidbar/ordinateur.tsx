"use client"
import { headers } from "next/headers"
import { FcElectricalSensor } from "react-icons/fc"
import { AvatarDemo } from "./avatar"
import { Button } from "../ui/button"
import Link from "next/link"
import { ModeToggle } from "../ui/modetheme"
import { useSession } from "next-auth/react"

export function OrdinateurSidbar() {
    const session = useSession()
    const userSession =session?.data?.user
console.log(userSession)    
    return(
        
         <div className="relative  h-16 items-center justify-between w-full hidden md:flex md:container">
         
           <div className=" flex space-x-2 items-center">
                <div>
                    <Link href="/">
                      <FcElectricalSensor size={70}/>  
                    </Link>
                </div>
               <nav className=" space-x-2">
                <Button>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" className=" font-bold">
                    <Link href="/apropos">
                A propos
                </Link>
                </Button>
                <Button variant="ghost" className=" font-bold">
                <Link href="/projets">
                Projets
                </Link>
                </Button>
                
               </nav>
            </div>
            <div className=" flex items-center space-x-3">
                {
                    userSession ? <Link href="/settings">
                        <AvatarDemo image={userSession?.image?.toString()}/>
                    </Link>  :
                    <Button variant="outline">
                        <Link href="/auth/login"> Se connecter</Link>
                    </Button>
                }
               
            </div>
          
         </div>
       
      
    )
}