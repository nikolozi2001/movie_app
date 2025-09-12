# Loading Skeletons Implementation

This implementation provides a comprehensive skeleton loading system for the movie app, improving perceived performance and user experience with animated placeholder content.

## Features

- ✅ **Animated Skeletons**: Smooth pulsing animation that mimics loading
- ✅ **Content-Structure Matching**: Skeletons match actual content layout
- ✅ **Performance Optimized**: Prevents layout shifts and improves perceived speed
- ✅ **Customizable**: Easy to customize colors, sizes, and animations
- ✅ **TypeScript Support**: Fully typed for better development experience
- ✅ **Reusable Components**: Modular skeleton components for different content types

## Components

### 1. Base Skeleton Component
```tsx
import Skeleton from '@/components/Skeleton';

// Basic usage
<Skeleton width={200} height={20} borderRadius={4} />

// With custom styling
<Skeleton
  width="80%"
  height={100}
  borderRadius={12}
  style={{ marginBottom: 16 }}
  animated={true}
/>
```

### 2. MovieCardSkeleton
Mimics the structure of movie cards in the grid layout.

```tsx
import MovieCardSkeleton from '@/components/MovieCardSkeleton';

// Usage in FlatList
{moviesLoading ? (
  <FlatList
    data={Array.from({ length: 6 })}
    renderItem={() => <MovieCardSkeleton />}
    keyExtractor={(_, index) => `skeleton-${index}`}
  />
) : (
  // Actual movie cards
)}
```

### 3. TrendingCardSkeleton
Mimics trending movie cards with overlay content.

```tsx
import TrendingCardSkeleton from '@/components/TrendingCardSkeleton';

// Usage in horizontal list
<View style={{ flexDirection: 'row' }}>
  {Array.from({ length: 5 }).map((_, index) => (
    <TrendingCardSkeleton key={`trending-skeleton-${index}`} />
  ))}
</View>
```

### 4. SearchBarSkeleton
Mimics the search bar component.

```tsx
import SearchBarSkeleton from '@/components/SearchBarSkeleton';

// Usage
<SearchBarSkeleton />
```

### 5. HomeSkeleton (Complete Page)
Full-page skeleton that matches the home screen layout.

```tsx
import HomeSkeleton from '@/components/HomeSkeleton';

// Usage
{isLoading ? <HomeSkeleton /> : <HomeContent />}
```

## Custom Hook

### useSkeleton Hook
Provides advanced loading state management with timing controls.

```tsx
import { useSkeleton } from '@/hooks/useSkeleton';

const MyComponent = ({ loading }) => {
  const { showSkeleton } = useSkeleton(loading, {
    delay: 200,        // Wait 200ms before showing skeleton
    minDuration: 500,  // Show skeleton for at least 500ms
  });

  return showSkeleton ? <SkeletonComponent /> : <ActualContent />;
};
```

## Implementation Examples

### Basic Loading State
```tsx
const MovieList = ({ movies, loading }) => {
  if (loading) {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <MovieCard movie={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
```

### Advanced Loading with Hook
```tsx
const AdvancedMovieList = ({ movies, loading }) => {
  const { showSkeleton } = useSkeleton(loading, {
    delay: 150,
    minDuration: 300,
  });

  if (showSkeleton) {
    return <HomeSkeleton />;
  }

  return <MovieGrid movies={movies} />;
};
```

### Conditional Loading States
```tsx
const SmartLoader = ({ trendingLoading, moviesLoading }) => {
  // Show trending skeleton if only trending is loading
  if (trendingLoading && !moviesLoading) {
    return (
      <View>
        <TrendingCardSkeleton />
        {/* Show actual movies if available */}
      </View>
    );
  }

  // Show full skeleton if both are loading
  if (trendingLoading && moviesLoading) {
    return <HomeSkeleton />;
  }

  // Show movie skeleton if only movies are loading
  if (!trendingLoading && moviesLoading) {
    return (
      <View>
        {/* Show actual trending */}
        <MovieCardSkeleton />
      </View>
    );
  }

  return null;
};
```

## Styling & Customization

### Colors
Skeletons use a dark theme that matches the app design:
- Background: `#2a2a3e` (dark gray)
- Animation: Opacity pulsing between 0.3 and 0.7

### Animation
- **Type**: Opacity pulsing
- **Duration**: 1000ms per cycle
- **Easing**: `Easing.inOut(Easing.ease)`
- **Native Driver**: Enabled for performance

### Customization
```tsx
// Custom skeleton colors
const styles = StyleSheet.create({
  customSkeleton: {
    backgroundColor: '#AB8BFF', // Custom color
  },
});

// Usage
<Skeleton style={styles.customSkeleton} />
```

## Performance Considerations

### Best Practices
1. **Avoid Over-Animation**: Don't animate too many skeletons simultaneously
2. **Use Native Driver**: Always use `useNativeDriver: true` for animations
3. **Limit Skeleton Count**: Only show skeletons for visible content
4. **Debounce Loading**: Use the `useSkeleton` hook to prevent flash
5. **Memoization**: Memoize skeleton arrays to prevent re-renders

### Performance Tips
```tsx
// Memoize skeleton array
const skeletonData = React.useMemo(
  () => Array.from({ length: 6 }),
  []
);

// Use in FlatList
<FlatList
  data={skeletonData}
  renderItem={() => <MovieCardSkeleton />}
  keyExtractor={(_, index) => `skeleton-${index}`}
/>
```

## Integration with Existing Code

### Current Implementation
The home screen (`app/(tabs)/index.tsx`) now uses `HomeSkeleton`:

```tsx
{moviesLoading || trendingLoading ? (
  <HomeSkeleton />
) : moviesError || trendingError ? (
  <ErrorState />
) : (
  <MovieContent />
)}
```

### Benefits of Current Setup
- ✅ **No Layout Shift**: Skeleton maintains exact same dimensions as content
- ✅ **Smooth Transitions**: Animated skeletons provide visual feedback
- ✅ **Error Handling**: Graceful fallback to error states
- ✅ **Performance**: Optimized with native animations

## Future Enhancements

- [ ] Add shimmer effect animation
- [ ] Implement progressive loading (load sections individually)
- [ ] Add skeleton variants for different screen sizes
- [ ] Create skeleton generator for dynamic content
- [ ] Add accessibility labels for screen readers
- [ ] Implement skeleton theming system

## Testing

### Unit Tests
```tsx
// __tests__/Skeleton.test.tsx
import { render } from '@testing-library/react-native';
import Skeleton from '../components/Skeleton';

test('renders skeleton with correct dimensions', () => {
  const { getByTestId } = render(
    <Skeleton width={200} height={20} testID="skeleton" />
  );
  const skeleton = getByTestId('skeleton');
  expect(skeleton.props.style.width).toBe(200);
  expect(skeleton.props.style.height).toBe(20);
});
```

### Integration Tests
```tsx
// Test loading states
test('shows skeleton during loading', () => {
  const { getByTestId } = render(<MovieList loading={true} />);
  expect(getByTestId('home-skeleton')).toBeTruthy();
});
```

## Accessibility

Skeletons include accessibility considerations:
- Screen reader announcements for loading states
- Proper test IDs for automated testing
- Reduced motion support (can be added)

```tsx
// Accessibility-friendly skeleton
<Skeleton
  accessible={true}
  accessibilityLabel="Loading content"
  testID="loading-skeleton"
/>
```

This skeleton system significantly improves the user experience by providing immediate visual feedback and preventing layout shifts during loading states.