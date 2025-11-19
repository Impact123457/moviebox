import Image from "next/image";
import Link from "next/link";
const Footer = () =>{
    return(
        <section className="py-5 bg-white shadow-sm font-sans">
            <div className="flex justify-between items-center">
                <div className="p-3">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={90} height={90} />
                    </Link>
                </div>
                <div className="flex items-center text-black w-[600px] text-center">
                    <p>
                        Keep track of everything you watch, create custom playlists, 
                        save your favorites, and organize your “must-watch” list for the next movie night.
                    </p>
                </div>
                <div className="flex items-right text-black w-[200px]">
                    <p>Contact information: 
                    <br></br>  
                    movieBox.info@gmail.com
                    <br></br> 
                    +368 098 123 333
                    </p>
                </div>
            </div>
        </section>
    )
}
export default Footer