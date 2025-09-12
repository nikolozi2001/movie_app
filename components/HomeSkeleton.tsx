import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MovieCardSkeleton from './MovieCardSkeleton';
import SearchBarSkeleton from './SearchBarSkeleton';
import Skeleton from './Skeleton';
import TrendingCardSkeleton from './TrendingCardSkeleton';

const HomeSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Background Image Placeholder */}
      <Skeleton
        width="100%"
        height="100%"
        borderRadius={0}
        style={styles.background}
        animated={false}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Logo Skeleton */}
        <Skeleton
          width={48}
          height={40}
          borderRadius={8}
          style={styles.logo}
        />

        {/* Search Bar Skeleton */}
        <SearchBarSkeleton />

        {/* Trending Movies Section */}
        <View style={styles.section}>
          {/* Section Title Skeleton */}
          <Skeleton
            width={140}
            height={20}
            borderRadius={4}
            style={styles.sectionTitle}
          />

          {/* Trending Movies List Skeleton */}
          <View style={styles.trendingList}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TrendingCardSkeleton key={`trending-${index}`} />
            ))}
          </View>
        </View>

        {/* Latest Movies Section */}
        <View style={styles.section}>
          {/* Section Title Skeleton */}
          <Skeleton
            width={120}
            height={20}
            borderRadius={4}
            style={styles.sectionTitle}
          />

          {/* Latest Movies Grid Skeleton */}
          <View style={styles.moviesGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <MovieCardSkeleton key={`movie-${index}`} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0D23',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  trendingList: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeSkeleton;