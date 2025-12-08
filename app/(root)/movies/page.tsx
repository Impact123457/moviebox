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
        <div className="max-w-[900px] mx-auto my-5 p-5">
            
            {/*<p>{querys ? 'Serch results for "${query}"' : 'Movies'}</p>*/}      
                <div className="flex items-center justify-between">
                    <p className="text-black font-bold text-[20px]">movies</p> 
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
