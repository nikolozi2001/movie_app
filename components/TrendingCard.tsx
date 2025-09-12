import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import { useFavorites } from "@/hooks/useFavorites";
import { Ionicons } from "@expo/vector-icons";
import OptimizedImage from "./OptimizedImage";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  const { toggleFavoriteMovie, checkIsFavorite } = useFavorites();
  const isFavorite = checkIsFavorite(movie_id);

  const handleToggleFavorite = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleFavoriteMovie({
        id: movie_id,
        poster_path: poster_url.replace('https://image.tmdb.org/t/p/w500', ''),
        title,
        vote_average: 0,
        release_date: "",
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
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <OptimizedImage
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          contentFit="cover"
          placeholder="https://placehold.co/400x600/1a1a1a/FFFFFF.png?text=Loading..."
          priority="normal"
          cachePolicy="memory-disk"
        />

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={handleToggleFavorite}
          className="absolute top-2 right-2 bg-black/50 rounded-full p-1 z-10"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={16}
            color={isFavorite ? "#FF6B6B" : "#FFFFFF"}
          />
        </TouchableOpacity>

        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
