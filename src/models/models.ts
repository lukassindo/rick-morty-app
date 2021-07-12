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
    disabled?: boolean,
}

type CardProps = {
    all: boolean,
    index: number,
    data: Data,
    addFavorite: (event: React.MouseEvent<HTMLButtonElement>, name: string, url: string) => void;
    removeFavorite: (event: React.MouseEvent<HTMLButtonElement>, name: string) => void;
}

type SearchProps = {
    getData: (searchInfo: string) => void;
}

type AllCards = {
    search: string,
}

type PaginationComponent = {
    page: number[], 
    count: number,
    goToPage: ( numbers:number[]) => void;
}
type RickAndMortyPayload = {
    results: Characters,
    errorMessage?: string,
}

type CharacterFilter = {
    name: string;
}

export type {Data, Characters, CardProps, PaginationComponent, RickAndMortyPayload, CharacterFilter, SearchProps, AllCards}

