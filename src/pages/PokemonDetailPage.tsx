import React, { useEffect, useState, createContext, ReactNode, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.ts';
import { Pokemon } from '../types/Pokemon';
import { useFavorites } from '../contexts/FavoritesContext';

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

const PokemonDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: pokemon, loading, error } = useFetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some(fav => fav.id === pokemon?.id);

    const handleFavoriteToggle = () => {
        if (pokemon) {
            if (isFavorite) {
                removeFavorite(pokemon);
            } else {
                addFavorite(pokemon);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching Pokémon details.</div>;

    return (
        <div>
            <div className="pokemon-detail">
                <h1>{pokemon?.name}</h1>
                <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
                <h2>Types</h2>
                <ul>
                    {pokemon?.types.map((typeInfo) => (
                        <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
                    ))}
                </ul>
                <h2>Abilities</h2>
                <ul>
                    {pokemon?.abilities.map((abilityInfo) => (
                        <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
                    ))}
                </ul>
                <h2>Stats</h2>
                <ul>
                    {pokemon?.stats.map((statInfo) => (
                        <li key={statInfo.stat.name}>
                            {statInfo.stat.name}: {statInfo.base_stat}
                        </li>
                    ))}
                </ul>
                <button onClick={handleFavoriteToggle}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default PokemonDetailPage;