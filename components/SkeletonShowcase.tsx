import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSkeleton } from '../hooks/useSkeleton';
import HomeSkeleton from './HomeSkeleton';
import MovieCardSkeleton from './MovieCardSkeleton';
import SearchBarSkeleton from './SearchBarSkeleton';
import Skeleton from './Skeleton';
import TrendingCardSkeleton from './TrendingCardSkeleton';

// Example component demonstrating different skeleton loading patterns
const SkeletonShowcase = () => {
  const [loadingStates, setLoadingStates] = useState({
    basic: false,
    movies: false,
    trending: false,
    search: false,
    home: false,
  });

  const { showSkeleton: showAdvancedSkeleton } = useSkeleton(loadingStates.home, {
    delay: 200,
    minDuration: 500,
  });

  const simulateLoading = (key: keyof typeof loadingStates, duration = 2000) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }, duration);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skeleton Loading Showcase</Text>

      {/* Basic Skeletons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Skeletons</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => simulateLoading('basic')}
        >
          <Text style={styles.buttonText}>
            {loadingStates.basic ? 'Loading...' : 'Load Basic'}
          </Text>
        </TouchableOpacity>

        {loadingStates.basic && (
          <View style={styles.skeletonContainer}>
            <Skeleton width={200} height={20} style={styles.skeleton} />
            <Skeleton width={150} height={16} style={styles.skeleton} />
            <Skeleton width={180} height={24} borderRadius={12} style={styles.skeleton} />
          </View>
        )}
      </View>

      {/* Movie Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Movie Cards</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => simulateLoading('movies')}
        >
          <Text style={styles.buttonText}>
            {loadingStates.movies ? 'Loading...' : 'Load Movies'}
          </Text>
        </TouchableOpacity>

        {loadingStates.movies && (
          <View style={styles.grid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <MovieCardSkeleton key={`movie-${index}`} />
            ))}
          </View>
        )}
      </View>

      {/* Trending Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Cards</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => simulateLoading('trending')}
        >
          <Text style={styles.buttonText}>
            {loadingStates.trending ? 'Loading...' : 'Load Trending'}
          </Text>
        </TouchableOpacity>

        {loadingStates.trending && (
          <View style={styles.horizontalList}>
            {Array.from({ length: 3 }).map((_, index) => (
              <TrendingCardSkeleton key={`trending-${index}`} />
            ))}
          </View>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search Bar</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => simulateLoading('search')}
        >
          <Text style={styles.buttonText}>
            {loadingStates.search ? 'Loading...' : 'Load Search'}
          </Text>
        </TouchableOpacity>

        {loadingStates.search && <SearchBarSkeleton />}
      </View>

      {/* Full Home Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full Home Skeleton</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => simulateLoading('home')}
        >
          <Text style={styles.buttonText}>
            {loadingStates.home ? 'Loading...' : 'Load Home'}
          </Text>
        </TouchableOpacity>

        {showAdvancedSkeleton && (
          <View style={styles.homeContainer}>
            <HomeSkeleton />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0D23',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#AB8BFF',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#AB8BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  skeletonContainer: {
    gap: 12,
  },
  skeleton: {
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  horizontalList: {
    flexDirection: 'row',
    gap: 16,
  },
  homeContainer: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default SkeletonShowcase;