import { MOVIE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

export default async function MoviePage(props: { params: Promise<{ id: string }> }) {
  
  const { id } = await props.params;   
  if (!id) return <p>Invalid movie ID.</p>;

  const movie = await client.fetch(MOVIE_BY_ID_QUERY, { id });
  if (!movie) return <p>Movie not found.</p>;

  return (
  <>
    <div className="p-5 my-5 shadow-lg max-w-[900px] mx-auto min-h-[550px]">
      <div className="flex gap-6 ">
        <div className="m-5">
            <Image src={movie.image} width={300} height={350} alt={movie.title} className="rounded shadow"/>
          <div className="bg-gray-500 max-w-[300px] h-[50px]">
            hi
          </div>
        </div>

        <div className="pt-5 ">
          <h1 className="text-[30px] font-bold">{movie.title}</h1>
            <div className="flex">
              <p>{movie.release}</p>
              <p className="mx-2">Directed by: <Link href="/" className="">{movie.director.name}{movie.director.surname}</Link></p>
              <p className="mx-2">Genre: {movie.genre.name}</p>
            </div>
          <p className="mt-4 max-w-[400px]">{movie.description}</p>
        </div>  
      </div>

      <div className="max-w-[300px]">
          
      </div>
    </div>
  </>
  );
}
