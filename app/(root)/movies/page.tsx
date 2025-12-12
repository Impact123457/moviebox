import { MOVIE_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import MovieCard, { MovieTypeCard } from "@/app/components/MovieCard";
import SearchForm from "@/app/components/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Movies({searchParams}: {
    searchParams: Promise<{ query?: string }>
}){
    const query = (await searchParams).query;
    const params = { search: query || null}
    const {data: movies} = await sanityFetch({ query: MOVIE_QUERY, params});
    return(
    <>
        <div className="md:w-[900px] mx-auto my-5 p-5">
                <div className="flex items-center justify-between">
                <p className="text-black font-bold md:text-[20px]">
                    {query ? `Search results for "${query}"` : 'Movies'}
                </p>     
                    <SearchForm query={query}/>
                </div>
                
                <div className="justify-center items-center ">     
                    <hr className="border border-black mb-1 shadow-lg" />    
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
        </div>
        <SanityLive />
       </>  
    );
}
