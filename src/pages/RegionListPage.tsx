import React, { useEffect, useState } from 'react';
import { RegionList } from '../components/RegionList';
import { fetchRegions } from '../services/api';

const RegionListPage: React.FC = () => {
    const [regions, setRegions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRegions = async () => {
            try {
                const data = await fetchRegions();
                setRegions(data);
            } catch (err) {
                setError('Failed to fetch regions');
            } finally {
                setLoading(false);
            }
        };

        getRegions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Pokémon Regions</h1>
            <RegionList regions={regions} />
        </div>
    );
};

export default RegionListPage;