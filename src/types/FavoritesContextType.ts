export interface FavoritesContextType {
    favorites: Pokemon[];
    addFavorite: (pokemon: Pokemon) => void;
    removeFavorite: (pokemonId: number) => void;
  }