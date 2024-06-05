"use client"
import { headers } from "next/headers"
import { FcElectricalSensor } from "react-icons/fc"
import { AvatarDemo } from "./avatar"
import { Button } from "../ui/button"
import Link from "next/link"
import { ModeToggle } from "../ui/modetheme"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"

export function MobileSidBar() {
    const [isOpen , setIsOpen] = useState(false)
    const session = useSession()
    const userSession =session?.data?.user
    const handleClick =()=>{
        setIsOpen(v=>!v)
    }
    
    return(
        <motion.div className=" md:hidden h-16 flex items-center container justify-between" 
       >
            <motion.div onClick={()=>handleClick()} whileHover={{ scale: 1.1 }}>
            <button className="relative w-[30px] h-[24px] flex flex-col items-center justify-center space-y-2">
            <span className={`block h-[2px] w-full bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block h-[2px] w-full bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-[2px] w-full bg-black transition-transform duration-300 ${isOpen ? ' rotate-[-50deg] -translate-y-3.5' : ''}`}></span>
            </button>
            </motion.div>
            <div className=" flex justify-center">
                    <Link href="/">
                      <FcElectricalSensor size={70}/>  
                    </Link>
                </div>
            <div>
               
            {
                isOpen && (
                    <div className="space-x-2 items-center absolute left-0  top-16  backdrop-blur-xl w-full pt-9 pb-3 h-[100vmax]">
               <motion.nav className=" space-x-2 flex flex-col  items-center" whileHover={{ scale: 1.2 }}>
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
                
               </motion.nav>
            </div>
            
                )
            }
            </div>
            <div>

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
        </motion.div>
    )
}