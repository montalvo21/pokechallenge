import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.ts';
import { Pokemon } from '../types/Pokemon';

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: pokemon, loading, error } = useFetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching Pokémon details.</div>;

    return (
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
        </div>
    );
};

export default PokemonDetail;