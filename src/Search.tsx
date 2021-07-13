import React, { useState } from 'react';
import { SearchProps } from './models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

const Search = ({getData}: SearchProps ) => {
    
    const [searchData, setSearch] = useState<string>('');

    const search = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const submit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getData(searchData);    
    }

    return(
        <>
        <form onSubmit={submit} className="relative mb-2">
            <label htmlFor="search" className="sr-only">Search character by name</label>
            <input onChange ={search}  type="text" name="search" id="search" className="placeholder-searchbar text-sm bg-primary p-searchbar rounded-xl min-w-screen-sm" placeholder="Search character by name"></input>
            <button type="submit" className="absolute right-2 text-sm top-2.5">
            <FontAwesomeIcon icon="search" className="text-base"/>
            </button>
        </form>
        </>
    )
}

export default Search;