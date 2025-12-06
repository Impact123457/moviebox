import { MOVIE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

export default async function MoviePage(props: { params: Promise<{ id: string }> }) {
  
  const { id } = await props.params;   // <-- FIX
  console.log("Movie ID:", id);
  if (!id) return <p>Invalid movie ID.</p>;

  const movie = await client.fetch(MOVIE_BY_ID_QUERY, { id });
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <Image src={movie.image} width={300} height={450} alt={movie.title} className="rounded shadow" />
      <p className="mt-4"><strong>Genre:</strong> {movie.genre.name}</p>
      <p><strong>Year:</strong> {movie.release}</p>
      <p className="mt-4 max-w-2xl">{movie.description}</p>
    </div>
  );
}
