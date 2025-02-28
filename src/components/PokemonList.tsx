import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.ts';
import { Region } from '../types/Region';

const RegionList: React.FC = () => {
    const { data: regions, loading, error } = useFetch<Region[]>('https://pokeapi.co/api/v2/region');

    if (loading) return <div>Loading regions...</div>;
    if (error) return <div>Error loading regions: {error.message}</div>;

    return (
        <div className="region-list">
            <h2>Pokémon Regions</h2>
            <ul>
                {regions?.map((region: Region) => (
                    <li key={region.name}>
                        <Link to={`/regions/${region.name}`}>{region.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegionList;