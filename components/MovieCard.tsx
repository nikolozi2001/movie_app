import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";
import { useFavorites } from "@/hooks/useFavorites";
import { Ionicons } from "@expo/vector-icons";
import OptimizedImage from "./OptimizedImage";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const { toggleFavoriteMovie, checkIsFavorite } = useFavorites();
  const isFavorite = checkIsFavorite(id);

  const handleToggleFavorite = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleFavoriteMovie({
        id,
        poster_path,
        title,
        vote_average,
        release_date,
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        original_language: "",
        original_title: title,
        overview: "",
        popularity: 0,
        video: false,
        vote_count: 0,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] relative">
        <OptimizedImage
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          contentFit="cover"
          placeholder="https://placehold.co/600x400/1a1a1a/FFFFFF.png?text=Loading..."
          priority="normal"
          cachePolicy="memory-disk"
        />

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={handleToggleFavorite}
          className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#FF6B6B" : "#FFFFFF"}
          />
        </TouchableOpacity>

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
