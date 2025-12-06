import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import Image from "next/image";

const SearchForm = ({query}: {query?: string}) => {
    return(
        <Form action="/" scroll={false} className="SearchForm">
            <input 
                name="query"
                defaultValue={query}
                className="search"
                placeholder="search..."
            />
            <div className="gap-2">
                {query && <SearchFormReset />}
                <button>
                    <Image src="/search.png" alt="search" width={20} height={20} className="submit"/>
                </button>
            </div>
        </Form>
    )
}
export default SearchForm;