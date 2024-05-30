import { ResetPasswordForm } from "@/components/auth/reset-password";

export default function Reset() {
    
    return <div className="container mx-auto px-4 md:max-w-[450px] mt-4">
        <div className=" text-2xl text-center mb-4">Mot de passe oublier</div>
        <ResetPasswordForm/>
    </div>
}