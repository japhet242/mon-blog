import { BsWhatsapp } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { GrYoutube } from "react-icons/gr";

export function FooterLayout() {
    return (
        <footer className="bottom-0 w-full bg-amber-700 flex justify-between px-20 text-white pt-5 flex-wrap">
            <div className="max-w-xl">
                <h1 className="text-xl italic mb-4">Me retrouver</h1>
                <p>
                    Après avoir appris sur Internet quoi de plus normal que de partager à son tour ? Passionné par le web depuis un peu plus de 15 ans maintenant j'aime partager mes compétences et mes découvertes avec les personnes qui ont cette même passion pour le web.
                </p>
                <div className="flex p-3">
                    <BsWhatsapp size={35} />
                    <FcGoogle size={40} />
                </div>
            </div>
            <div>
                <h1 className="text-xl italic mb-4">Me contacter</h1>
                <div className="flex items-center mb-2">
                    <MdOutlineMail className="mr-2" /> par Email
                </div>
                <div className="flex items-center mb-2">
                    <GrYoutube className="mr-2" /> Chain youtube
                </div>
            </div>
        </footer>
    );
}
