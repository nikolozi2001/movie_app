# Pull-to-Refresh Implementation

This implementation provides smooth pull-to-refresh functionality for the movie app, allowing users to manually refresh content by pulling down on the screen.

## Features

- ✅ **Smooth Animation**: Native-feeling pull-to-refresh experience
- ✅ **Visual Feedback**: Loading indicator with custom colors
- ✅ **Error Handling**: Graceful error handling during refresh
- ✅ **Concurrent Refresh**: Refreshes multiple data sources simultaneously
- ✅ **Customizable**: Easy to customize colors, messages, and behavior

## Implementation

### Basic Usage

```tsx
import { RefreshControl } from 'react-native';

const MyComponent = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Your refresh logic here
      await fetchNewData();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#AB8BFF"]}
          tintColor="#AB8BFF"
          title="Refreshing..."
          titleColor="#AB8BFF"
        />
      }
    >
      {/* Your content */}
    </ScrollView>
  );
};
```

### Using Custom Hook

```tsx
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

const MyComponent = () => {
  const { refreshing, onRefresh, refreshControlProps } = usePullToRefresh({
    onRefresh: async () => {
      await fetchNewData();
    }
  });

  return (
    <ScrollView refreshControl={<RefreshControl {...refreshControlProps} />}>
      {/* Your content */}
    </ScrollView>
  );
};
```

## Current Implementation

The main screen (`app/(tabs)/index.tsx`) implements pull-to-refresh with:

1. **Dual Data Refresh**: Refreshes both trending movies and latest movies
2. **Concurrent Loading**: Uses `Promise.all()` for parallel data fetching
3. **Error Handling**: Catches and logs errors during refresh
4. **Visual Feedback**: Purple-themed loading indicator matching the app design

### Code Structure

```tsx
// State management
const [refreshing, setRefreshing] = useState(false);

// Refresh function
const onRefresh = useCallback(async () => {
  setRefreshing(true);
  try {
    await Promise.all([
      refetchTrending(),
      refetchMovies(),
    ]);
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    setRefreshing(false);
  }
}, [refetchTrending, refetchMovies]);

// ScrollView with RefreshControl
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["#AB8BFF"]}
      tintColor="#AB8BFF"
      title="Refreshing movies..."
      titleColor="#AB8BFF"
    />
  }
>
```

## Customization Options

### RefreshControl Props

- `colors`: Array of colors for the refresh indicator (Android)
- `tintColor`: Color of the refresh indicator (iOS)
- `title`: Text shown below the indicator (iOS)
- `titleColor`: Color of the title text (iOS)
- `progressBackgroundColor`: Background color of the indicator (Android)

### Custom Hook Options

```tsx
const { refreshing, onRefresh, refreshControlProps } = usePullToRefresh({
  onRefresh: async () => {
    // Your custom refresh logic
  },
  enabled: true, // Enable/disable pull-to-refresh
});
```

## Best Practices

1. **Keep it Fast**: Refresh operations should be quick (< 2-3 seconds)
2. **Handle Errors**: Always wrap refresh logic in try-catch
3. **Visual Feedback**: Use consistent colors matching your app theme
4. **Concurrent Loading**: Use `Promise.all()` for multiple data sources
5. **User Feedback**: Show appropriate loading states and error messages

## Platform Differences

### iOS
- Shows spinner with title text
- Pull distance is fixed
- Smooth bounce animation

### Android
- Shows circular progress indicator
- Customizable colors
- Material Design guidelines

## Troubleshooting

### Common Issues

1. **Refresh not triggering**: Check that ScrollView is the top-level scrollable component
2. **Colors not showing**: Ensure proper color format (#RRGGBB or named colors)
3. **Performance issues**: Avoid heavy computations during refresh
4. **Multiple refreshes**: Implement proper loading state management

### Debug Tips

```tsx
// Add logging to debug refresh issues
const onRefresh = useCallback(async () => {
  console.log('🔄 Starting refresh...');
  setRefreshing(true);
  try {
    await refreshData();
    console.log('✅ Refresh completed');
  } catch (error) {
    console.error('❌ Refresh failed:', error);
  } finally {
    setRefreshing(false);
  }
}, []);
```

## Future Enhancements

- [ ] Add haptic feedback on refresh
- [ ] Implement smart refresh (only refresh stale data)
- [ ] Add pull-to-refresh for individual lists
- [ ] Implement infinite scroll with refresh
- [ ] Add refresh analytics tracking