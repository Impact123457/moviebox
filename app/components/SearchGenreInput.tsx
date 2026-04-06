"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchGenres({ genres }: { genres: { _id: string; name: string }[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get("gsearch") || "";

  const handleSelect = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gsearch", name);
    router.push(`/movies?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("gsearch");
    router.push(`/movies?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {genres.map((g) => (
        <div key={g._id} className="flex items-center gap-1">
          <input
            type="radio"
            name="genre"
            value={g.name}
            checked={selectedGenre === g.name} // ← tukaj se radio deselecta/selektira pravilno
            onChange={() => handleSelect(g.name)}
            className="cursor-pointer p-1.5 m-1 bg-gray-200 rounded-full text-sm font-medium"
          />
          <label className="cursor-pointer">{g.name}</label>
        </div>
      ))}
      <button
        onClick={handleClear}
        className="cursor-pointer p-1 px-2 bg-red-500 text-white rounded-full text-sm"
      >
        Clear
      </button>
    </div>
  );
}