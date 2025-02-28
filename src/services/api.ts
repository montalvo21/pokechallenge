import axios from 'axios';
import { Pokemon } from '../types/Pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchRegions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/region`);
        return response.data.results;
    } catch (error) {
        throw new Error('Error fetching regions');
    }
};

export const fetchPokemonByRegion = async (regionName: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/region/${regionName}`);
        const pokemonUrls = response.data.pokemon_species;
        const pokemonPromises = pokemonUrls.map((pokemon: { url: string }) => axios.get(pokemon.url));
        const pokemonResponses = await Promise.all(pokemonPromises);
        return pokemonResponses.map(res => res.data);
    } catch (error) {
        throw new Error('Error fetching Pokémon by region');
    }
};

export const fetchPokemonDetails = async (pokemonName: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Pokémon details');
    }
};

export const fetchPokemonsByRegion = async (region: string): Promise<Pokemon[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/region/${region}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
    }
    const data = await response.json();
    // Transform the data as needed to match the Pokemon type
    return data.pokemon_entries.map((entry: any) => ({
        id: entry.pokemon_species.id,
        name: entry.pokemon_species.name,
        sprites: {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.pokemon_species.id}.png`,
        },
        types: [], // Add logic to fetch types if needed
        abilities: [], // Add logic to fetch abilities if needed
        stats: [], // Add logic to fetch stats if needed
    }));
};