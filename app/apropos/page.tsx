"use client"
import { animate, motion } from "framer-motion"
import Image from "next/image"

export default function Page() {
    return (
        <div>
            <motion.div className=" text-center text-6xl font-bold border-b-4 border-t-4 my-4 py-4" initial={{opacity:0}} animate={{opacity:1}} >
                    Japhet Dufresny 
            </motion.div>
            <div className=" grid grid-cols-2">
            <div>
                <Image src={"/moi.jpg"} alt="aak" width={400} height={200} />
            </div>
            <div>
                cette page sera completer progressivement
            </div>
            </div>
            
        </div>
    )
}