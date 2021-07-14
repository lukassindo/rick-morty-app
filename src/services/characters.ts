import { Characters, Data, RickAndMortyPayload } from "../models/models";

const getFavorites = async (urls: string[]): Promise<RickAndMortyPayload> => {
    const results: Characters = [];
    const allData = await Promise.all(urls.map(el =>{
        return fetch(el)
        .then((response)=>response.json());
    }));
    allData.map((item) => {
        results.push(item);  
    });
    return getFinalData(results);
}

const getCharacters = async (page: number[], filters?: string): Promise<RickAndMortyPayload> => {
    let url = `https://rickandmortyapi.com/api/character/`;
    let results: Characters = []; 
    if(filters) {
        url += `?name=${filters.toLowerCase()}`;
    } else {
        url += `${page}`;
    }
    const response = await fetch(url);
    const result = await response.json();
    if(response.status !== 200) return { results: [], errorMessage: "Pick proper name"};
    if(filters) {
        results = result.results;
    } else {
        results = result;
    }
    return getFinalData(results);
}

const getFinalData = async (results: Data[]) : Promise<RickAndMortyPayload> => {
    const episodes: string[] = [];
    results.forEach((el: Data) => {
        const ep: string = el.episode[0];
        episodes.push(ep);
    });

    const episodesData  = await Promise.all(episodes.map(el => {
        return fetch(el)
        .then((response)=>response.json()) ;
    }));
      
    results.map((item: Data, index) => {
        item.episode = episodesData[index].name;
        item.disabled = false;
        return item;
    });

    return {results, errorMessage: ""};
}

export  {getCharacters, getFavorites};