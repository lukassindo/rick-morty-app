import React, {useEffect, useState} from 'react';
import {getCharacters} from './services/characters';
import { Characters, Data } from './models/models';
import Character from './Character';

const Favorites: React.FunctionComponent = () => {
    const [characters, setCharacters] = useState<Characters>();
    const [removed, setRemoved] = useState<Boolean>(false);
    
    useEffect(() => {
        let values: string[] = Object.values(localStorage);
        console.log(values);
        async function getData() { 
            const data = await getCharacters(values, true);
            setCharacters(data);
          
        }
        getData();
    },[removed])
    console.log(characters);
    console.log(removed);

    const removeFavorites = (event: React.MouseEvent<HTMLButtonElement>, name: string) => {
        localStorage.removeItem(name);
        (removed) ? setRemoved(false) : setRemoved(true);
    }
    const AddFavorite = (event: React.MouseEvent<HTMLButtonElement>, name: string, url: string) => {} 
    return (
        <div className="favorites container mx-auto px-4 grid grid-cols-3 gap-4">
            {(characters) && characters.map((character, index)=> (
                <Character all={false} index= {index} data ={character} removeFavorite={removeFavorites} addFavorite={AddFavorite}/>
            ))}
        </div>
    )  
}

export default Favorites;