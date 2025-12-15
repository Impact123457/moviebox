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

interface Genre {
  _id: string;
  name: string;
}

export default async function MoviePage(props: { params: Promise<{ id: string }> }) {
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
    <div className="p-5 my-5 shadow-lg md:w-[900px] mx-auto h-[520px]">
      <div className="flex gap-6 ">
        <div className="m-5">
            <Image src={movie.image} width={300} height={350} alt={movie.title} className="rounded shadow"/>
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
            <Liked id={id} likeId={likeId}/>
            <Watched id={id} watchedId={watchedId}/>
            <WatchList id={id} watchId={watchId} />
          </div>
        </div>  
      </div>
    </div>
    <SanityLive />
  </>
  );
}


