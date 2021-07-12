import React, { useState } from 'react';
import { SearchProps } from './models/models';

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
        <form onSubmit={submit}>
            <label htmlFor="search" className="sr-only">Search character by name</label>
            <input onChange ={search}  type="text" name="search" id="search" className="placeholder-searchbar text-sm bg-primary p-searchbar rounded-xl" placeholder="Search character by name"></input>
            <button type="submit"></button>
        </form>
        </>
    )
}

export default Search;