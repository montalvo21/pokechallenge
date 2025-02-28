import React from 'react';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../pages/PokemonCard';

interface FavoriteListProps {
    favorites: Pokemon[];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites }) => {
    if (favorites.length === 0) {
        return <div>No favorite Pokémon added yet.</div>;
    }

    return (
        <div className="favorite-list">
            {favorites.map((pokemon: Pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
};

export default FavoriteList;