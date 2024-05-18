"use server"
import { auth, signOut } from "@/auth";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default async function Setting(){
    const session =await auth()
return <div>
    {JSON.stringify(session?.user)}
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign in</button>
    </form>
    {session?.user.image?.length ? <Image src={`${session.user.image}`} alt="photo" width={300} height={300}/>:null}
</div>
}