import Form from "next/form";
import Image from "next/image";

//s tem uporabnik isce filme na movies strani
export default function SearchForm({query}: {query?: string}){
    return(
        <Form action="/movies" scroll={false} className="SearchForm">
            <input 
                name="query"
                defaultValue={query}
                className="search"
                placeholder="search..."
            />
            <div className="gap-2">
                <button type="submit" name="search">
                    <Image src="/search.png" alt="search" width={20} height={20} className="submit"/>
                </button>
            </div>
        </Form>
    )
}