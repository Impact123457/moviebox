import Link from "next/link"
import Image from "next/image"
import { auth, signOut, signIn } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
const Navbar = async() =>{   
    const session = await auth();//a je user prijavlen
    return(
        <header className="px-5 py-5 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={110} height={110}></Image>
                </Link>
                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ?(
                        <>
                        <Link href={'/user/${session?.id}'}>
                            <Image src="/profile.png" alt="profile icon" width={40} height={40} className="rounded-full"
                             />
                        </Link>
                        <form action={async() => {
                            "use server"
                            await signOut({redirectTo:"/"})
                        }}>
                            <button>Log out</button>
                        </form>
                        </>
                    ):(
                        <>
                        <form action={async() => {
                            "use server";
                            await signIn('github')
                        }}>
                            <button type="submit">Log in</button>
                        </form>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}
export default Navbar