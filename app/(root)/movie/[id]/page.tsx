import { MOVIE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

interface Genre {
  _id: string;
  name: string;
}
export default async function MoviePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;   
  //if (!id) return <p>Invalid movie ID.</p>;
  const movie  = await client.fetch(MOVIE_BY_ID_QUERY, { id });
  //if (!movie) return <p>Movie not found.</p>;

  return (
  <>
    <div className="p-5 my-5 shadow-lg md:w-[900px] mx-auto h-[520px]">
      <div className="flex gap-6 ">
        <div className="m-5">
            <Image src={movie.image} width={300} height={350} alt={movie.title} className="rounded shadow"/>
        </div>

        <div className="pt-5 md:w-[600px] w-[200px]">
          <h1 className="font-bold md:text-[15px]">{movie.title}</h1>
            <div className="flex text-[15px] md:text-[15px]">
              <p>{movie.release}</p>
              <p className="mx-2">Directed by: <Link href="/" className="">{movie.director.name}{movie.director.surname}</Link></p>
              <p className="mx-2">Genre: {movie.genre?.map((g: Genre) => g.name).join(", ") || "Unknown"}</p>
            </div>
          <p className="mt-4 md:w-[400px]">{movie.description}</p>
          <div className="shadow-lg md:w-[200px] md:h-[50px] w-[150px] justify-between mt-3 flex">
            <button className="cursor-pointer mx-3">
              <Image src="/heart.png" alt="heart" width={30} height={30}></Image>
            </button>
            <button className="cursor-pointer">
              <Image src="/didntView.png" alt="didntView" width={30} height={30}></Image>
            </button>
            <button className="cursor-pointer mx-3">
              <Image src="/watchList.png" alt="watch" width={30} height={30}></Image>
            </button>
          </div>
        </div>  
      </div>
    </div>
  </>
  );
}

