import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import { fetchPokemonsByRegion } from '../services/api';
import { Pokemon } from '../types/Pokemon';

const PokemonListPage: React.FC = () => {
    const { region } = useParams<{ region: string }>();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPokemons = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPokemonsByRegion(region);
                setPokemons(data);
            } catch (err) {
                setError('Failed to fetch Pokémon data');
            } finally {
                setLoading(false);
            }
        };

        getPokemons();
    }, [region]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return <PokemonList pokemons={pokemons} />;
};

export default PokemonListPage;