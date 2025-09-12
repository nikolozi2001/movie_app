import ErrorBoundary from "@/components/ErrorBoundary";
import { FavoritesProvider } from "@/hooks/useFavorites";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <FavoritesProvider>
          <StatusBar hidden={true} />

          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="movies/[id]"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </FavoritesProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
