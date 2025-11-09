import Link from "next/link"
import Image from "next/image"
const Navbar = () =>{   
    return(
        <header className="px-5 py-5 shadow-sm bg-white font-work-sans">
            <nav>
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={110} height={110}></Image>
                </Link>
            </nav>
        </header>
    )
}
export default Navbar