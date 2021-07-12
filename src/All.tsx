import React, { useEffect, useMemo, useState } from 'react';
import {getCharacters} from './services/characters';
import Character from './Character';
import './App.css';
import Pagination from './Pagination';
import { Characters, AllCards } from './models/models';

const AllCharacters = ({search}: AllCards) => {
    const [page, setPage] = useState<number[]>([1,2,3,4,5,6]);
    const [count, setCount] = useState<number>(0);
    const [characters, setCharacters] = useState<Characters>([]);

    useEffect(()=> {
        let names: string[] = Object.keys(localStorage);
        
        characters.forEach((el, index) => {
            let match = names.find(item=> item === el.name);
            if (match !== undefined) characters[index].disabled = true;
        })
        
        const Count =  async() => {
          const data = await fetch("https://rickandmortyapi.com/api/character");
          const result = await data.json();
          const count = result.info.count;
          setCount(count);
        }
        Count();
    },[]);

    useMemo(() => {
      const getChar = async() => {
        const data = await getCharacters(page, search);
        const results = data.results;
        setCharacters(results);
      } 
      getChar();
    },[page, search]);

    console.log(search);
    console.log(characters);
    const prevPage = () => {
        if (JSON.stringify(page) !== JSON.stringify([1,2,3,4,5,6])) {
          let newPage: number[] = [];
          page.forEach(el => {
            newPage.push(el-6);
          });
          setPage(newPage);
        }
    };
    
    const nextPage = () => {
      if(page.find(el => el === count)) {
        return;
      } else {
        let newPage: number[] = [];
        page.forEach(el => {
          newPage.push(el+6);
        });
        setPage(newPage);
      }    
    }

    const goToPage = ( numbers: number[]) => {
        setPage(numbers);
    }
        
    const AddFavorite = (event: React.MouseEvent<HTMLButtonElement>, name: string, url: string) => {
        localStorage.setItem(name, url);
        let target = event.target as HTMLButtonElement;
        target.disabled = true;

    }

    const removeFavorites = (event: React.MouseEvent<HTMLButtonElement>, name: string) => {}

    const loading = (<p className="loading text-white font-extrabold animate-pulse">Loading...</p>);

    const persons = (
      <>
        <div className="all container mx-auto px-4 grid grid-cols-3 gap-4">
        {characters.map((character, index)=> (
          <div key={index}>
            <Character all={true} index={index} data ={character} addFavorite={AddFavorite} removeFavorite={removeFavorites}/>
          </div>
        ))}
        </div>
          
        {(!search) && 
          <div>
            <button onClick={prevPage}>
              Previous
          </button>
            {(count > 0) && <Pagination page = {page} count={count} goToPage={goToPage}/>}
          <button onClick={nextPage}>
              Next
            </button>
        </div>
        }  
      </>
    )

    return (
      <>
      {(characters) ? persons : loading}
      </>
    )
    
}

export default AllCharacters;