
type AllData = [{
    info: {},
    results: {}
}];

type Characters = Data[];
   
type Data = {
    created?: string,
    episode : string[] | string,
    gender?: string,
    id?: number,
    image: string,
    location: {
        name: string,
    },
    name: string,
    origin?: {},
    species: string,
    type?: string,
    url: string,
    status: string,

}



export type {Data, Characters, AllData}

