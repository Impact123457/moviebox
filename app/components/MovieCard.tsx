import Link from "next/link";
import Image from "next/image";
import {User, Movie, Genre} from "@/sanity/types";

export type MovieTypeCard = Omit<Movie, "genre"> & {genre?: Genre};

const MovieCard = ({movie}: {movie: MovieTypeCard}) => {  
    return(
        <li className="w-[150] h-[210] overflow-hidden">
                <Link href={`/movie/${movie._id}`}>
                    <Image src={movie.image} alt="poster" width={150} height={210} className="object-cover"/>
                </Link>
        </li>
    )
}
export default MovieCard