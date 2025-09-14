import ErrorBoundary from "@/components/ErrorBoundary";
import { FavoritesProvider } from "@/hooks/useFavorites";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

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
