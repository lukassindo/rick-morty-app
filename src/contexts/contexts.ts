import React from 'react';

export const favorites = {
    characters: [],
    addCharacter(event:HTMLButtonElement) {
        console.log(event)
    }
}

export const ThemeContext = React.createContext(favorites);