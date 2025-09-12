import React from 'react';
import { StyleSheet, View } from 'react-native';
import Skeleton from './Skeleton';

const MovieCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Movie Poster Skeleton */}
      <Skeleton
        width="100%"
        height={180}
        borderRadius={12}
        style={styles.poster}
      />

      {/* Movie Title Skeleton */}
      <View style={styles.content}>
        <Skeleton
          width="80%"
          height={16}
          borderRadius={4}
          style={styles.title}
        />

        {/* Rating/Year Skeleton */}
        <View style={styles.metaContainer}>
          <Skeleton
            width={60}
            height={12}
            borderRadius={4}
            style={styles.metaItem}
          />
          <Skeleton
            width={40}
            height={12}
            borderRadius={4}
            style={styles.metaItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 16,
  },
  poster: {
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 4,
  },
  title: {
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  metaItem: {
    marginRight: 8,
  },
});

export default MovieCardSkeleton;