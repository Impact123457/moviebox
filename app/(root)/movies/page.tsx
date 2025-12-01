import { MOVIE_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import MovieCard, { MovieTypeCard } from "@/app/components/MovieCard";

export default async function Movies(){
    const movies = await client.fetch(MOVIE_QUERY);
    return(
        <>
        {/*<p>{querys ? 'Serch results for "${query}"' : 'Movies'}</p>*/}
        <p className="h2">Movies:</p>
        <div className="flex justify-center items-center"> 
            <ul className="cardDiv">
                    {movies?.length > 0 ?(
                        movies.map((movie: MovieTypeCard) => ( 
                            <MovieCard key={movie?._id} movie={movie} />
                        ))
                    ):(
                        <p>No movie found.</p>
                    )}
            </ul>
        </div>
        </>
    );
}
