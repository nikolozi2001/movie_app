# Error Boundaries Implementation

This project includes comprehensive error boundary implementation to handle JavaScript errors gracefully and provide a better user experience.

## Components

### 1. `ErrorBoundary` (Global)
- **Location**: `components/ErrorBoundary.tsx`
- **Purpose**: Catches errors in the entire app
- **Usage**: Wraps the root layout in `app/_layout.tsx`
- **Features**:
  - Displays user-friendly error messages
  - Shows detailed error info in development mode
  - Provides retry functionality
  - Logs errors to console (can be extended to external services)

### 2. `ScreenErrorBoundary` (Screen-level)
- **Location**: `components/ScreenErrorBoundary.tsx`
- **Purpose**: Catches errors in specific screens/components
- **Usage**: Wrap individual screens or complex components
- **Features**:
  - Customizable error messages
  - Retry functionality
  - Smaller footprint for screen-specific errors

### 3. `useErrorHandler` Hook
- **Location**: `hooks/useErrorHandler.ts`
- **Purpose**: Programmatic error handling in functional components
- **Usage**: For handling async errors and custom error states

## Usage Examples

### Global Error Boundary (Already implemented)
```tsx
// app/_layout.tsx
import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        {/* Your app content */}
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
```

### Screen-level Error Boundary
```tsx
import ScreenErrorBoundary from "@/components/ScreenErrorBoundary";

const MyScreen = () => (
  <ScreenErrorBoundary
    fallbackTitle="Failed to load data"
    fallbackMessage="Please check your connection and try again."
    onRetry={() => refetchData()}
  >
    <MyComplexComponent />
  </ScreenErrorBoundary>
);
```

### Error Handler Hook
```tsx
import { useErrorHandler } from "@/hooks/useErrorHandler";

const MyComponent = () => {
  const { error, handleError, clearError, hasError } = useErrorHandler();

  const fetchData = async () => {
    try {
      await riskyOperation();
    } catch (err) {
      handleError(err as Error);
    }
  };

  if (hasError) {
    return <ErrorUI error={error} onRetry={clearError} />;
  }

  return <NormalUI />;
};
```

## Error Handling Strategy

1. **Global Boundary**: Catches unhandled errors at the app level
2. **Screen Boundaries**: Handle screen-specific errors gracefully
3. **Component Level**: Use hooks for programmatic error handling
4. **API Level**: Handle network errors in service functions

## Benefits

- ✅ **Better UX**: Users see friendly error messages instead of crashes
- ✅ **Debugging**: Detailed error info in development mode
- ✅ **Recovery**: Retry functionality allows users to recover from errors
- ✅ **Monitoring**: Centralized error logging for debugging
- ✅ **Graceful Degradation**: App continues to function even with errors

## Future Enhancements

- [ ] Integrate with error monitoring services (Sentry, Bugsnag)
- [ ] Add error reporting to analytics
- [ ] Implement offline error caching
- [ ] Add error boundary for specific features (payment, authentication)