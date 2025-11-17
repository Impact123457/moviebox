import Image from "next/image";
import Link from "next/link";
const Footer = () =>{
    return(
        <section className="px-5 py-5 bg-white shadow-sm font-sans">
            <div className="flex justify-between items-center">
                <div className="p-5">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={120} height={120} />
                    </Link>
                </div>
                <div className="flex items-center gap-5 text-black uppercase font-bold w-[500px] text-center">
                    <p>
                        Keep track of everything you watch, create custom playlists, 
                        save your favorites, and organize your “must-watch” list for the next movie night.
                    </p>
                </div>
                <div className="flex items-right gap-5 text-black uppercase font-bold w-[300px]">
                    <p>Contact information:
                    <br></br>  
                    <ul>
                        <li>movieBox.info@gmail.com</li>
                        <li>+368 098 123 333</li>
                    </ul>
                    </p>
                </div>
            </div>
        </section>
    )
}
export default Footer