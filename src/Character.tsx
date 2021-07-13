import { CardProps} from './models/models';

const Character = ({data, index, addFavorite, removeFavorite, all} :CardProps) => {

    return (
        <div className="charBox h-box bg-primary text-white flex rounded-lg overflow-hidden m-center" key={index}>
            <div className="imgBox">
                <img className="max-w-img object-cover h-full" src={data.image} alt={data.name}/>
            </div>
            <div className="content text-left px-3 py-3.5 flex flex-col justify-between">
                <h2 className="text-xl leading-5">{data.name}</h2>
                <p className="text-sm">{`${data.status} - ${data.species}`}</p>
                <div>
                    <span className="block text-xs font-light text-secondary">Last known location</span>
                    <p className="text-sm">{data.location.name}</p>
                </div>
                <div>
                    <span className="block text-xs font-light text-secondary">First seen in</span>
                    <p className="text-sm">{data.episode}</p>
                </div>
                {(all) ?
                    <button disabled={(data.disabled)} onClick= {() => addFavorite(data.name, data.url)} className="text-sm w-48 bg-transparent py-1 border-2 border-white disabled:bg-disabled disabled:cursor-disabled ">Add to Favorites</button>
                    :
                    <button onClick= {(e) => removeFavorite(data.name)} className="text-sm w-48 bg-transparent py-1 border-2 border-white">Remove from Favorites</button>
                }
            </div>
        </div>
    )
}

export default Character;