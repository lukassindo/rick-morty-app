import React, {useEffect, useState} from 'react';
import { Characters, Data} from './models/models';


type CardProps = {
    all: boolean,
    index: number,
    data: Data,
    addFavorite: (event: React.MouseEvent<HTMLButtonElement>, name: string, url: string) => void;
    removeFavorite: (event: React.MouseEvent<HTMLButtonElement>, name: string) => void;
}



const Character = ({data, index, addFavorite, removeFavorite, all} :CardProps) => {
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(()=> {
        let names: string[] = Object.keys(localStorage);
        console.log(names);
        names.forEach(name=> {
            (name === data.name) && setDisabled(true); 
        })
    },[]);

    return (
        <div className="charBox h-box bg-primary text-white flex rounded-lg overflow-hidden m-center" key={index}>
            <div className="imgBox">
                <img className="max-w-img object-cover h-full" src={data.image} alt={data.name}/>
            </div>
            <div className="content text-left px-3 py-3.5 flex flex-col justify-between">
                <h2 className="text-xl leading-5">{data.name}</h2>
                <p className="text-sm">{`${data.status} - ${data.species}`}</p>
                <div>
                    <span className="block text-xs">Last known location</span>
                    <p className="text-sm">{data.location.name}</p>
                </div>
                <div>
                    <span className="block text-xs">First seen in</span>
                    <p className="text-sm">{data.episode}</p>
                </div>
                {(all) ?
                    <button disabled={disabled} onClick= {(e) => addFavorite(e, data.name, data.url)} className="text-sm w-48 bg-transparent py-1 border-2 border-white disabled:bg-disabled disabled:cursor-disabled ">Add to Favorites</button>
                    :
                    <button onClick= {(e) => removeFavorite(e, data.name)} className="text-sm w-48 bg-transparent py-1 border-2 border-white">Remove from Favorites</button>
                }
            </div>
        </div>
    )
}



export default Character;