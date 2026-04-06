import { MOVIE_QUERY, GENRE_QUERY } from "@/sanity/lib/queries";
import MovieCard, { MovieTypeCard } from "@/app/components/MovieCard";
import SearchForm from "@/app/components/SearchForm";
import SearchGenreInput from "@/app/components/SearchGenreInput";
import { sanityFetch } from "@/sanity/lib/live";
import { Suspense } from "react";
import MovieCardSkeleton from "@/app/components/skeletons/MovieCardSkeleton";

export default async function Movies({ searchParams }: { searchParams: { query?: string; gsearch?: string } }) {
  const search = (await searchParams).query ?? "";
  const gsearch = (await searchParams).gsearch ?? "";

  const params = { 
    search: search, 
    gsearch: gsearch 
};
console.log(params)

  // Fetch movies glede na params
  const { data: movies } = await sanityFetch({ query: MOVIE_QUERY, params });
  const { data: genres } = await sanityFetch({ query: GENRE_QUERY });

  return (
    <div className="md:w-[900px] mx-auto my-5 p-5">

      {/* Search po title */}
      <div className="flex items-center justify-between">
        <p className="text-black font-bold md:text-[20px]">
          {search ? `Search results for "${search}"` : 'Movies'}
        </p>
        <SearchForm query={search} />
      </div>

      {/* Filter po žanrih */}
      <div className="mt-3 flex flex-wrap gap-2">
        <SearchGenreInput genres={genres} />
      </div>

      {/* Movies list */}
      <ul className="cardDiv">
        {movies?.length > 0 ? movies.map((movie: MovieTypeCard) => (
          <Suspense key={movie._id} fallback={<MovieCardSkeleton />}>
            <MovieCard movie={movie} />
          </Suspense>
        )) : <p>No movie found.</p>}
      </ul>
    </div>
  );
}