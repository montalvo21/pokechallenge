import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import FavoriteList from '../components/FavoriteList';

const FavoritesPage: React.FC = () => {
    const { favorites } = useFavorites();

    return (
        <div className="favorites-page">
            <h1>Your Favorite Pokémon</h1>
            {favorites.length > 0 ? (
                <FavoriteList favorites={favorites} />
            ) : (
                <p>No favorite Pokémon added yet.</p>
            )}
        </div>
    );
};

export default FavoritesPage;