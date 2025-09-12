import React from 'react';
import { StyleSheet, View } from 'react-native';
import Skeleton from './Skeleton';

const SearchBarSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Search Input Skeleton */}
      <Skeleton
        width="100%"
        height={50}
        borderRadius={25}
        style={styles.searchInput}
      />

      {/* Optional: Search Icon Placeholder */}
      <View style={styles.iconContainer}>
        <Skeleton
          width={20}
          height={20}
          borderRadius={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 16,
    marginBottom: 8,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingLeft: 50, // Space for icon
  },
  iconContainer: {
    position: 'absolute',
    left: 16,
    top: 15,
    zIndex: 1,
  },
});

export default SearchBarSkeleton;