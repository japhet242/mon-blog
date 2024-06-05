"use client"
import { MobileSidBar } from "./mobilesidbar";
import { OrdinateurSidbar } from "./ordinateur";

export function Sidbar() {
    return(
      
       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2 border-b-gray-300 border-b-[1px] fixed z-50 w-full bg-white  ">
        <OrdinateurSidbar/>
         <MobileSidBar/>
       </div>
    )
}