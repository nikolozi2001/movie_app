import { FavoriteMovie, getFavorites, toggleFavorite } from '@/services/favorites';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: FavoriteMovie[];
  favoriteIds: Set<number>;
  loading: boolean;
  toggleFavoriteMovie: (movie: Movie) => Promise<void>;
  refreshFavorites: () => Promise<void>;
  checkIsFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const refreshFavorites = async () => {
    try {
      setLoading(true);
      const favoriteMovies = await getFavorites();
      setFavorites(favoriteMovies);
      setFavoriteIds(new Set(favoriteMovies.map(fav => fav.movie_id)));
    } catch (error) {
      console.error('Error refreshing favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavoriteMovie = async (movie: Movie) => {
    try {
      const isNowFavorite = await toggleFavorite(movie);

      if (isNowFavorite) {
        // Add to favorites
        const newFavorite: FavoriteMovie = {
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          added_at: new Date().toISOString(),
        };
        setFavorites(prev => [newFavorite, ...prev]);
        setFavoriteIds(prev => new Set([...prev, movie.id]));
      } else {
        // Remove from favorites
        setFavorites(prev => prev.filter(fav => fav.movie_id !== movie.id));
        setFavoriteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(movie.id);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  const checkIsFavorite = (movieId: number): boolean => {
    return favoriteIds.has(movieId);
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  const value: FavoritesContextType = {
    favorites,
    favoriteIds,
    loading,
    toggleFavoriteMovie,
    refreshFavorites,
    checkIsFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};