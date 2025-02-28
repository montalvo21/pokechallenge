import React from 'react';
import { FavoritesProvider } from './contexts/FavoritesContext';
import FavoriteList from './components/FavoriteList';

const App: React.FC = () => {
    return (
        <FavoritesProvider>
            <div className="App">
                {/* Add your routes and components here */}
                <FavoriteList />
            </div>
        </FavoritesProvider>
    );
};

export default App;