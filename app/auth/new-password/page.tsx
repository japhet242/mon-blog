import { NewPasswordForm } from "@/components/auth/new-password";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function New() {
    return <div className="container mx-auto px-4 md:max-w-[450px] mt-4">
        <NewPasswordForm/>
        <Button variant="ghost" className=" mt-5">
            <Link href={"/"} className=" text-blue-400 flex items-center"> <GoArrowLeft className=" w-7"/><span>retourner a la page d'acceul</span></Link>
        </Button>
    </div>
}