import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Pokemon } from '../types/Pokemon';

interface FavoritesContextType {
    favorites: Pokemon[];
    addFavorite: (pokemon: Pokemon) => void;
    removeFavorite: (pokemon: Pokemon) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Pokemon[]>([]);

    const addFavorite = (pokemon: Pokemon) => {
        setFavorites([...favorites, pokemon]);
    };

    const removeFavorite = (pokemon: Pokemon) => {
        setFavorites(favorites.filter(fav => fav.id !== pokemon.id));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};