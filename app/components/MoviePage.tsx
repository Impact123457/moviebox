import Link from "next/link";
import Image from "next/image";
import {Movie, Genre} from "@/sanity/types";

export type MovieTypeCard = Omit<Movie, "genre"> & {genre?: Genre};

const MoviePage = ({movie}: {movie: MovieTypeCard}) => {  
    return(
        <li className="w-[150] h-[210] overflow-hidden">
                <Link href={`/movies/${movie._id}`}>
                    <Image src={movie.image} alt={movie.name} width={150} height={210} className="object-cover"/>
                </Link>
        </li>
    )
}
export default MoviePage