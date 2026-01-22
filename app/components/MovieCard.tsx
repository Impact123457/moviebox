import Link from "next/link";
import Image from "next/image";
import {Movie} from "@/sanity/types";
export type MovieTypeCard = Omit<Movie, "user"> & {
    image?: string;
};

//samo prikaze film
export default async function MovieCard({movie}: {movie: MovieTypeCard}){ 
    return(
        <li className="w-[150] h-[210] overflow-hidden">
            <Link href={`/movie/${movie._id}`}>
                <Image src={movie.image!}  alt={movie.title || "Movie Poster"} width={150} height={210} className="img" />
            </Link>
        </li>
    )
}