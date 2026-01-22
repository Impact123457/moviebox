import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { WATCHED_MOVIE } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

//definiran tip filma
export type Movie = {
    _id: string;
    title?: string;
    release?: string;
    description?: string;
    genre?: string;
    Director?: string;
    image?: string;
};

export default async function Watched(){
    const session = await auth();//a je user prijavlen
    const user = session?.user;
    
    //preveri ce uporabnik obstaja
    if (!user) {
        return <p className="text-center">Please log in to see your liked movies.</p>;
    }

    //pridobi watched filme
    const watched = await client.fetch(WATCHED_MOVIE(user.id));
    const movie = watched?.[0]?.movies || [];
    
    //Ce filmi ne obstajajo
    if (!movie || movie.length === 0) {
        return <div className="md:w-[900px] h-[550px] mx-auto flex items-center justify-center"><p className="text-center p-5">You have not watched any movies yet!!</p></div>
    }
    return(
        <section className="mt-5 md:w-[900px] shadow-lg mx-auto min-h-[520px]">
            <div>
                <h2 className="text-black p-3 font-bold text-[20px]">Already seen, but why not again?</h2>
                <hr className="border border-black mb-1 shadow-lg" /> 
                <ul className="cardDiv">
                    {/**prikazejo se vsi filmi, ki so v movie spremenljivki */}
                    {movie.map((movie: Movie) => (
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
