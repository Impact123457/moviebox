import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { LIKED_MOVIE } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function liked(){
    const session = await auth();//a je user prijavlen
    const user = session?.user;

    if (!user) {
    return <p className="text-center">Please log in to see your liked movies.</p>;
    }

    const liked = await client.fetch(LIKED_MOVIE(user.id));
    const movie = liked?.[0]?.movies || [];

    if (!movie || movie.length === 0) {
         return <div className="md:w-[900px] h-[550px] mx-auto flex items-center justify-center"><p className="text-center p-5">You have no liked movies yet!!</p></div>
    }
    return(
        <section className="mt-5 shadow-lg md:w-[900px]  mx-auto min-h-[520px]">
            <div>
                <h2 className="text-black p-3 font-bold md:text-[20px]">Your personal favorites</h2>
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
