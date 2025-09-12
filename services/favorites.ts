import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'user_favorites';

export interface FavoriteMovie {
  movie_id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  added_at: string;
}

export const toggleFavorite = async (movie: Movie): Promise<boolean> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites: FavoriteMovie[] = favoritesJson ? JSON.parse(favoritesJson) : [];

    const existingIndex = favorites.findIndex(fav => fav.movie_id === movie.id);

    if (existingIndex >= 0) {
      // Remove from favorites
      favorites.splice(existingIndex, 1);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return false; // Not favorited anymore
    } else {
      // Add to favorites
      const newFavorite: FavoriteMovie = {
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        added_at: new Date().toISOString(),
      };
      favorites.unshift(newFavorite); // Add to beginning
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true; // Now favorited
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

export const getFavorites = async (): Promise<FavoriteMovie[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const isFavorite = async (movieId: number): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.movie_id === movieId);
  } catch (error) {
    console.error("Error checking if favorite:", error);
    return false;
  }
};