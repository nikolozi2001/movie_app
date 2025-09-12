import React from 'react';
import { StyleSheet, View } from 'react-native';
import Skeleton from './Skeleton';

const TrendingCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Movie Poster Skeleton */}
      <Skeleton
        width={120}
        height={180}
        borderRadius={12}
        style={styles.poster}
      />

      {/* Content Overlay Skeleton */}
      <View style={styles.overlay}>
        {/* Movie Title Skeleton */}
        <Skeleton
          width="70%"
          height={16}
          borderRadius={4}
          style={styles.title}
        />

        {/* Rating Skeleton */}
        <View style={styles.ratingContainer}>
          <Skeleton
            width={60}
            height={12}
            borderRadius={4}
            style={styles.rating}
          />
        </View>

        {/* Index Badge Skeleton */}
        <View style={styles.indexBadge}>
          <Skeleton
            width={24}
            height={24}
            borderRadius={12}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 26,
  },
  poster: {
    marginBottom: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 16,
    left: 8,
    right: 8,
  },
  title: {
    marginBottom: 8,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  rating: {
    marginBottom: 4,
  },
  indexBadge: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
});

export default TrendingCardSkeleton;