import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFavorites } from "@/hooks/useFavorites";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const { favorites, loading, refreshFavorites } = useFavorites();

  // Convert favorites to Movie format for MovieCard component
  const favoriteMovies: Movie[] = favorites.map((fav) => ({
    id: fav.movie_id,
    title: fav.title,
    poster_path: fav.poster_path,
    vote_average: fav.vote_average,
    release_date: fav.release_date,
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    original_language: "",
    original_title: fav.title,
    overview: "",
    popularity: 0,
    video: false,
    vote_count: 0,
  }));

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1">
          <ActivityIndicator size="large" color="#AB8BFF" />
          <Text className="text-white mt-4">Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="flex-1 mt-10">
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-white text-xl px-5 font-bold">My Favorites</Text>
          <Text className="text-gray-400 text-sm px-5">
            {favorites.length} {favorites.length === 1 ? "movie" : "movies"}
          </Text>
        </View>

        {favorites.length === 0 ? (
          <View className="flex justify-center items-center flex-1 flex-col gap-5">
            <Image
              source={icons.save}
              className="size-16"
              tintColor="#AB8BFF"
            />
            <Text className="text-white text-lg font-semibold text-center">
              No favorites yet
            </Text>
            <Text className="text-gray-400 text-sm text-center px-8">
              Start exploring movies and tap the heart icon to add them to your
              favorites!
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoriteMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 16,
              marginVertical: 16,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            onRefresh={refreshFavorites}
            refreshing={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Save;
