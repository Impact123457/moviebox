import { MOVIE_QUERY, GENRE_QUERY } from "@/sanity/lib/queries";
import MovieCard, { MovieTypeCard } from "@/app/components/MovieCard";
import SearchForm from "@/app/components/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { Suspense } from "react";
import MovieCardSkeleton from "@/app/components/skeletons/MovieCardSkeleton";

export default async function Movies({searchParams}: {
    searchParams: Promise<{ query?: string }>
}){
    //definira query in params glede na to kaj je uporabnik iskal
    const query = (await searchParams).query;
    const params = { search: query || null}
    const {data: movies} = await sanityFetch({ query: MOVIE_QUERY, params});
    const {data: ganre} = await sanityFetch({ query: GENRE_QUERY, params});
    return(
    <>
        <div className="md:w-[900px] mx-auto my-5 p-5">
                <div className="flex items-center justify-between">
                <p className="text-black font-bold md:text-[20px]">
                    {query ? `Search results for "${query}"` : 'Movies'}
                </p>
                    {/*tu notri uporabnik isce film */}
                    <SearchForm query={query}/>
                </div>
                
                <div className="justify-center items-center ">     
                    <hr className="border border-black mb-1 shadow-lg" />  
                    <div className="mt-3">
                        <p>{ganre?.length > 0 ? (
                            ganre.map((g: { _id: string; name: string }) => (
                            <span
                                key={g._id}
                                className="cursor-pointer p-1.5 m-1 bg-gray-200 rounded-full text-sm font-medium">
                                {g.name}
                            </span>
                            ))
                        ) : (
                            <p>No genres found.</p>
                        )}</p>
                    </div>  
                    <ul className="cardDiv">
                        {/*prikazejo se vsi filmi v spremenljivki movies */}
                            {movies?.length > 0 ?(
                                movies.map((movie: MovieTypeCard) => ( 
                                    <Suspense
                                        key={movie._id}
                                        fallback={<MovieCardSkeleton />}
                                    >
                                        <MovieCard movie={movie} />
                                    </Suspense>
                                ))
                            ):(
                                <p>No movie found.</p>
                            )}
                    </ul>
                </div>
        </div>
        {/**real-time updating. Vedno se sproti spreminja */}
        <SanityLive />
       </>  
    );
}
