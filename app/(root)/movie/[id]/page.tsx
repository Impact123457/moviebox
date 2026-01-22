import { 
  LIKE_BY_MOVIE_USER_ID_QUERY, 
  MOVIE_BY_ID_QUERY, 
  WATCHED_BY_MOVIE_USER_ID_QUERY, 
  WATCHLIST_BY_MOVIE_USER_ID_QUERY
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Liked from "@/app/components/Liked";
import Watched from "@/app/components/Watched";
import WatchList from "@/app/components/WatchList";
import { auth } from "@/auth";
import { SanityLive } from "@/sanity/lib/live";
import MovieSkeleton from '@/app/components/skeletons/movieSkeleton';
import { Suspense } from "react";

//definiran tip
interface Genre {
  _id: string;
  name: string;
}

export default async function MoviePage(props: { params: Promise<{ id: string }> }) {
  /**pridobi se user id in nato vsi podatki za movie, nato pa se vsi podatki za to ali je user vseckav film,
   * dodal na watchlist ali watched
   */
  const session = await auth();
  const userId = session?.user.id;
  const { id } = await props.params;   

  const movie  = await client.fetch(MOVIE_BY_ID_QUERY, { id });

  const like = await client.fetch(LIKE_BY_MOVIE_USER_ID_QUERY,{
    id,
    userId,
  })
  const likeId = like?._id;

  const watched = await client.fetch(WATCHED_BY_MOVIE_USER_ID_QUERY,{
    id,
    userId,
  })
  const watchedId = watched?._id;

  const watch = await client.fetch(WATCHLIST_BY_MOVIE_USER_ID_QUERY,{
    id,
    userId,
  })
  const watchId = watch?._id;

  return (
  <>
  {movie ? (
    <div className="p-5 my-5 shadow-lg md:w-[900px] mx-auto h-[520px]">
      <div className="flex gap-6 ">
        <div className="m-5">
          <Suspense fallback={<MovieSkeleton />}>
            <Image src={movie.image} width={300} height={350} alt={movie.title} className="rounded shadow"/>
          </Suspense>
        </div>

        <div className="pt-5 md:w-[600px] w-[200px]">
          <h1 className="font-bold md:text-[20px]">{movie.title}</h1>
            <div className="flex text-[15px] md:text-[15px]">
              <p>{movie.release}</p>
              <p className="mx-2">Directed by: <Link href="/" className="">{movie.director.name}{movie.director.surname}</Link></p>
              <p className="mx-2">Genre: {movie.genre?.map((g: Genre) => g.name).join(", ") || "Unknown"}</p>
            </div>
          <p className="mt-4 md:w-[400px]">{movie.description}</p>
          <div className="shadow-lg md:w-[200px] md:h-[50px] w-[150px] justify-between mt-3 flex">
            {/**se pokazejo v stanju, glede na to ali so dodani ali ne */}
            <Liked id={id} likeId={likeId}/>
            <Watched id={id} watchedId={watchedId}/>
            <WatchList id={id} watchId={watchId} />
          </div>
        </div>  
      </div>
    </div>
  ):(
    <div className="md:w-[900px] h-[550px] mx-auto flex items-center justify-center"><p className="text-center p-5">No movie found</p></div>
  )}
    {/**real-time updating. Vedno se sproti spreminja */}
    <SanityLive />
  </>
  );
}


