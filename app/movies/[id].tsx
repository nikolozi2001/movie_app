import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchMovieDetails, fetchMovieVideos } from "@/services/api";
import useFetch from "@/services/usefetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const pulseScale = useSharedValue(1);
  const entranceScale = useSharedValue(0);
  const entranceOpacity = useSharedValue(0);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const movieVideos = await fetchMovieVideos(id as string);
        setVideos(movieVideos);
      } catch (error) {
        console.error("Error loading videos:", error);
      }
    };

    if (id) {
      loadVideos();
    }
  }, [id]);

  // Entrance animation
  useEffect(() => {
    if (!loading && movie) {
      entranceScale.value = withSpring(1, { damping: 12, stiffness: 100 });
      entranceOpacity.value = withTiming(1, { duration: 500 });
    }
  }, [loading, movie, entranceScale, entranceOpacity]);

  // Pulse animation for idle state
  useEffect(() => {
    if (!isLoading && !loading) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [isLoading, loading, pulseScale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value * pulseScale.value * entranceScale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value * entranceOpacity.value,
    };
  });

  const handlePlayPress = async () => {
    console.log("Play button pressed");
    console.log("Available videos:", videos.length);

    // Start loading animation
    setIsLoading(true);

    // Animate button press
    scale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );

    // Add a subtle rotation effect
    rotation.value = withSequence(
      withTiming(5, { duration: 100 }),
      withTiming(-5, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );

    const trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    console.log("Found trailer:", trailer);

    if (trailer) {
      try {
        const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        console.log("Opening YouTube URL:", youtubeUrl);

        await Linking.openURL(youtubeUrl);
      } catch (error) {
        console.error("Error opening trailer:", error);
        Alert.alert("Error", "Unable to open trailer");
      }
    } else if (movie?.homepage) {
      try {
        console.log("No trailer found, opening homepage:", movie.homepage);
        await Linking.openURL(movie.homepage);
      } catch (error) {
        console.error("Error opening homepage:", error);
        Alert.alert("Error", "Unable to open movie homepage");
      }
    } else {
      console.log("No trailer or homepage available");
      Alert.alert("No Trailer Available", "Trailer not available for this movie");
    }

    // Stop loading animation
    setIsLoading(false);
  };

  const tapGesture = Gesture.Tap()
    .onStart(() => {
      // Add haptic feedback
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);

      // Add visual feedback
      scale.value = withTiming(0.9, { duration: 100 });
      opacity.value = withTiming(0.8, { duration: 100 });
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 8, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 200 });
      runOnJS(handlePlayPress)();
    });

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <GestureDetector gesture={tapGesture}>
            <Animated.View
              style={animatedStyle}
              className="absolute bottom-5 right-5 rounded-full size-14 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-2xl border border-gray-200"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View className="flex items-center justify-center">
                  <Image
                    source={icons.play}
                    className="w-6 h-7 ml-1"
                    resizeMode="stretch"
                  />
                  {/* Add a subtle glow effect */}
                  <View className="absolute inset-0 rounded-full bg-white opacity-20" />
                </View>
              )}
            </Animated.View>
          </GestureDetector>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
