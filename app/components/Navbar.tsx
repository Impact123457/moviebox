import Link from "next/link"
import Image from "next/image"
import { auth, signOut, signIn } from "@/auth";

const Navbar = async() =>{   

    const session = await auth();//a je user prijavlen

    return(
        <header className="bg-white shadow-sm">
            <nav className="flex justify-between items-center">
                <div className="p-3">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={90} height={90}></Image>
                    </Link>
                </div>

                <div className="mx-3 flex items-center gap-5 text-black uppercase font-bold text-[15px]">
                    {session && session?.user ?(
                     <> 
                        <Link href="/movies">
                            <span>Movies</span>
                        </Link>
                        <form action={async() => {
                            "use server"
                            await signOut({redirectTo:"/"})
                        }}>
                            <button type="submit" className="uppercase font-bold cursor-pointer">Log out</button>
                        </form>
                        <Link href={`/user/${session?.user?.id}`}>
                            <Image src="/profile.png" alt="profile icon" width={40} height={40} className="rounded-full"/>
                        </Link>
                     </>
                    ):(
                        <>
                            <Link href="/login">
                                <button type="submit" className="uppercase font-bold cursor-pointer">Log in</button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}
export default Navbar;