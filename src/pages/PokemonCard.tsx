import React from 'react';
import { Pokemon } from '../types/Pokemon';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <div className="pokemon-card">
            <h3>{pokemon.name}</h3>
            <p>#{pokemon.id}</p>
            <p>Type: {pokemon.types.join(', ')}</p>
        </div>
    );
};

export default PokemonCard;