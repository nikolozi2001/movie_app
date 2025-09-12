import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text> Movie Details for ID: {id}</Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
