import React, {useEffect, useState} from 'react';
import { Characters} from './models/models';
import {getCharacters, getChar} from './services/characters';
import Character from './Character';
import './App.css';
import { useQuery } from "react-query";

const All = () => {
    const [characters, setCharacters] = useState<Characters>();
    const [page, setPage] = useState(1);
    
    const { data, isLoading, isError, status, error } = useQuery(
        ["characters", page],
        () => getChar(page),
        {
          keepPreviousData: true,
        }
      );
    console.log(data)
    // setCharacters(data);

    // useEffect(() => {
        // async function getData() {
        // let i:number = 1;
        // const urls: string[] = [];
        // while(i < 34){
        //     urls.push(`https://rickandmortyapi.com/api/character?page=${i}`)
        //     i++;
        // }
        // const data = await getCharacters(urls, false);
        
        // }
        // getData();
    // }, []);

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };
    
    const nextPage = () => {
        setPage(page + 1);
    };

    const AddFavorite = (event: React.MouseEvent<HTMLButtonElement>, name: string, url: string) => {
        localStorage.setItem(name, url);
        console.log(event);
        let target = event.target as HTMLButtonElement;
        target.disabled = true;

    }
    const removeFavorites = (event: React.MouseEvent<HTMLButtonElement>, name: string) => {}

    const loading = (<p className="loading text-white font-extrabold animate-pulse">Loading...</p>);

    return (
        <>
        <div className="all container mx-auto px-4 grid grid-cols-3 gap-4">
   

        {(isLoading || status === "idle") && loading}
        {status === "success"  && 
             data!.map((character, index)=> (
                <Character all={true} index={index} data ={character} addFavorite={AddFavorite} removeFavorite={removeFavorites}/>
            ))
        }
        </div>
        <div>
        <button onClick={prevPage} disabled={page <= 1}>
          Prev
        </button>
        <span>{page}</span>
        <button onClick={nextPage}>
          Next
        </button>
      </div>
      </>
    )
    
}

export default All;