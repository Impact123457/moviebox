import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { SEEN_MOVIE } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function edit(){
    const session = await auth();//a je user prijavlen
    const user = session?.user;
    
    if (!user) {
        return <p className="text-center">Please log in to see your liked movies.</p>;
    }
        
    const seen = await client.fetch(SEEN_MOVIE(user.id));
    const movie = seen?.[0]?.movies || [];
        
    if (!movie || movie.length === 0) {
        return <p className="text-center">You havent watched any movies yet.</p>;
    }
    return(
        <section className="mt-5 shadow-lg w-[900px] mx-auto min-h-[520px]">
            <div>
                <h2 className="text-black p-2 font-bold text-[20px]">Pick your next watch:</h2>
                <hr className="border border-black mb-1 shadow-lg" /> 
                <ul className="cardDiv">
                    {movie.map((movie: any) => (
                        <li key={movie._id} className="w-[150px] h-[210px] overflow-hidden shadow">
                        <Link href={`/movie/${movie._id}`}>
                            <Image src={movie.image || '/logo.png'} alt={movie.title || "Movie Poster"} width={150} height={210} className="object-cover"/>
                        </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
