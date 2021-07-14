import React,{ useEffect, useMemo, useState } from 'react';
import {getCharacters} from './services/characters';
import Character from './Character';
import './App.css';
import Pagination from './Pagination';
import { Characters, Searches } from './models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faArrowRight );

const AllCharacters = ({search, clear = false}: Searches):JSX.Element => {
    const [page, setPage] = useState<number[]>([1,2,3,4,5,6]);
    const [count, setCount] = useState<number>(0);
    const [characters, setCharacters] = useState<Characters>([]);
    const [added, setAdded] = useState<boolean>(false);
    const [firstPage, setFirstPage] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(()=> {
        const Count =  async() => {
          const data = await fetch("https://rickandmortyapi.com/api/character");
          const result = await data.json();
          const count = result.info.count;
          setCount(count);
        }
        Count();
    },[]);

    useMemo(() => {
      if(firstPage)
      setPage([1,2,3,4,5,6])
    },[clear]);

    useEffect(() => {
      const getChar = async() => {
        const data = await getCharacters(page, search);
        if(data.errorMessage)  {
          setError(data.errorMessage)
        } else {setError('')}
        const results = data.results;
        setCharacters(results);
      } 
      getChar();
    },[page, search]);

    useMemo(() => {
      const urls: string[] = Object.values(localStorage);
        characters.forEach((el, index) => {
            const match = urls.find(item=> item === el.url);
            if (match !== undefined) characters[index].disabled = true;
        })
        setFirstPage(true)
    },[characters, added]);

    const prevPage = () => {
        if (JSON.stringify(page) !== JSON.stringify([1,2,3,4,5,6])) {
          const newPage: number[] = [];
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
        const newPage: number[] = [];
        page.forEach(el => {
          newPage.push(el+6);
        });
        setPage(newPage);
      }    
    }

    const goToPage = ( numbers: number[]) => {
        setPage(numbers);
    }
        
    const AddFavorite = (name: string, url: string) => {
        localStorage.setItem(name, url);
        setAdded(!added);
    }

    const removeFavorites = (name: string) => {return;}

    const loading = (<p className="loading text-white font-extrabold animate-pulse">Loading...</p>);
    
    const errorMsg = (<p className="loading text-white font-extrabold animate-pulse">{error}</p>)
    
    const persons = (
      <>
        <div className="all container mx-auto min-h-main grid lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-10 border-primary border-b-2">
        {characters.map((character, index)=> (
          <div key={index}>
            <Character all={true} index={index} data ={character} addFavorite={AddFavorite} removeFavorite={removeFavorites}/>
          </div>
        ))}
        </div>
          
        {(!search) && 
          <div className="pagination-container container flex justify-between mx-auto pt-4 pb-12">
            <button className="text-white font-bold" onClick={prevPage}>
              <FontAwesomeIcon icon="arrow-left" className="mr-2 text-sm relative bottom-0.5"/>
              Previous
          </button>
            {(count > 0) && <Pagination page = {page} count={count} goToPage={goToPage}/>}
          <button className="text-white font-bold" onClick={nextPage}>
              Next
              <FontAwesomeIcon icon="arrow-right" className="ml-2 text-sm relative bottom-0.5"/>
            </button>
        </div>
        }  
      </>
    )

    return (
      <>
      {(characters) ? persons : loading}
      {(error) && errorMsg}
      </>
    )
    
}

export default AllCharacters;