import { Characters, Data, AllData } from "../models/models";

const getCharacters = async (urls: string[], favorites: boolean): Promise<Characters> => {
    let allData = await Promise.all(urls.map(el =>{
        return fetch(el)
        .then((response)=>response.json()) 
    }));
    let charData: Characters = []
    allData = allData.map((item) => {
        if (favorites) {
            charData.push(item);
        } else {
            item.results.forEach((el:Data) => {
                charData.push(el);
            })
        }
    });
   
  
    let episodes: string[] = [];
    charData.forEach((el: Data) => {
        let ep: string = el.episode[0];
        episodes.push(ep)
    });

    let episodesData  = await Promise.all(episodes.map(el =>{
        return fetch(el)
        .then((response)=>response.json()) 
    }));
      
    charData.map((item: Data, index) => {
        item.episode = episodesData[index].name;
        return item
    });
    return charData;
}

const getChar = async (page = 1) => {
    const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
    )
    let allData = await response.json();
    let results: Characters = allData.results;

    let episodes: string[] = [];
    results.forEach((el: Data) => {
        let ep: string = el.episode[0];
        episodes.push(ep)
    });

    let episodesData  = await Promise.all(episodes.map(el =>{
        return fetch(el)
        .then((response)=>response.json()) 
    }));


    results.map((item: Data, index) => {
        item.episode = episodesData[index].name;
        return item
    });
    
    console.log(results)
    return results;
}

export {getCharacters, getChar};