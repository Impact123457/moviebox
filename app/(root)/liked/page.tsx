import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { LIKED_MOVIE } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

//definira type spremenljivke Movie
export type Movie = {
    _id: string;
    title?: string;
    release?: string;
    description?: string;
    genre?: string;
    Director?: string;
    image?: string;
};

export default async function Liked(){
    const session = await auth();//pridobi user
    const user = session?.user;

    //ali je user prijavljen
    if (!user) {
    return <p className="text-center">Please log in to see your liked movies.</p>;
    }

    //pridobi vse liked filme od tega uporabnika
    const liked = await client.fetch(LIKED_MOVIE(user.id));
    const movie = liked?.[0]?.movies || [];

    //ali sploh je kateri film liked
    if (!movie || movie.length === 0) {
         return <div className="md:w-[900px] h-[550px] mx-auto flex items-center justify-center"><p className="text-center p-5">You have no liked movies yet!!</p></div>
    }
    return(
        <section className="mt-5 shadow-lg md:w-[900px]  mx-auto min-h-[520px]">
            <div>
                <h2 className="text-black p-3 font-bold md:text-[20px]">Your personal favorites</h2>
                <hr className="border border-black mb-1 shadow-lg" /> 
                <ul className="cardDiv">

                    {/**za vsak film v spremenljivki se naredi isto, tako kot foreach zanka */}
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
