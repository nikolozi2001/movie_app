import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useErrorHandler } from "@/hooks/useErrorHandler";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/usefetch";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import HomeSkeleton from "@/components/HomeSkeleton";
import MovieCard from "@/components/MovieCard";
import ScreenErrorBoundary from "@/components/ScreenErrorBoundary";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter();
  const { clearError } = useErrorHandler();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useFetch(() => fetchMovies({ query: "" }));

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      // Refetch both data sources
      await Promise.all([
        refetchTrending(),
        refetchMovies(),
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchTrending, refetchMovies]);

  // Alternative: Using the custom hook (uncomment to use)
  // const { refreshing, onRefresh, refreshControlProps } = usePullToRefresh({
  //   onRefresh: async () => {
  //     await Promise.all([refetchTrending(), refetchMovies()]);
  //   }
  // });

  return (
    <ScreenErrorBoundary
      fallbackTitle="Failed to load movies"
      fallbackMessage="We couldn't load the movie data. Please check your connection and try again."
      onRetry={() => {
        clearError();
        onRefresh(); // Use the proper refresh function
      }}
    >
      <View className="flex-1 bg-primary">
        <Image
          source={images.bg}
          className="absolute w-full z-0"
          resizeMode="cover"
        />

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#AB8BFF"]}
              tintColor="#AB8BFF"
              title="Refreshing movies..."
              titleColor="#AB8BFF"
            />
          }
        >
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

          {moviesLoading || trendingLoading ? (
            <HomeSkeleton />
          ) : moviesError || trendingError ? (
            <View className="flex-1 justify-center items-center mt-10">
              <Text className="text-white text-lg mb-4">Failed to load content</Text>
              <Text className="text-gray-400 text-center mb-4">
                {moviesError?.message || trendingError?.message}
              </Text>
              <TouchableOpacity
                className="bg-accent px-6 py-3 rounded-lg"
                onPress={() => {
                  clearError();
                  // Trigger refetch
                }}
              >
                <Text className="text-white font-semibold">Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies.filter((movie, index, self) => 
                    index === self.findIndex(m => m.movie_id === movie.movie_id)
                  )}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `trending-${item.movie_id}-${index}`}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies?.filter((movie, index, self) => 
                  index === self.findIndex(m => m.id === movie.id)
                ) || []}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item, index) => `movie-${item.id}-${index}`}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-20"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
    </ScreenErrorBoundary>
  );
};

export default Index;
