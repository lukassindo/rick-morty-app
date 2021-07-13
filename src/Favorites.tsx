import {useEffect, useState} from 'react';
import {getFavorites} from './services/characters';
import { Characters } from './models/models';
import Character from './Character';

const Favorites = () => {
    const [characters, setCharacters] = useState<Characters>();
    const [removed, setRemoved] = useState<Boolean>(false);
    
    useEffect(() => {
        let values: string[] = Object.values(localStorage);
        async function getData() { 
            let data = await getFavorites(values);
            let results = data.results;
            setCharacters(results);
        }
        getData();
    },[removed])

    const removeFavorites = (name: string) => {
        localStorage.removeItem(name);
        (removed) ? setRemoved(false) : setRemoved(true);
    }
    
    const AddFavorite = (name: string, url: string) => {} 

    return (
        <div className="favorites lg:grid-cols-2 xl:grid-cols-3 container mx-auto px-4 grid gap-4">
            {(characters) && characters.map((character, index)=> (
                <div key={index}>
                    <Character all={false} index= {index} data ={character} removeFavorite={removeFavorites} addFavorite={AddFavorite}/>
                </div>
            ))}
        </div>
    )  
}

export default Favorites;