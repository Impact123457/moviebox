import Link from "next/link";
import Image from "next/image";
import {Movie, User} from "@/sanity/types";
export type MovieTypeCard = Omit<Movie, "user"> & {
    image?: string;
};

const MovieCard = ({movie}: {movie: MovieTypeCard}) => {  
    return(
        <li className="w-[150] h-[210] overflow-hidden">
                <Link href={`/movie/${movie._id}`}>
                    <Image src={movie.image!}  alt={movie.title || "Movie Poster"} width={150} height={210} className="img" />
                </Link>
        </li>
    )
}
export default MovieCard