"use client";
import Form from "next/form";
import Image from "next/image";

export default function SearchForm({ query }: { query?: string}) {
  return (
    <Form action="/movies" scroll={false} className="SearchForm">
      <input
        name="query"
        defaultValue={query}
        className="search"
        placeholder="search..."
      />
      <button type="submit" name="search" className="ml-2">
        <Image src="/search.png" alt="search" width={20} height={20} className="submit" />
      </button>
    </Form>
  );
}