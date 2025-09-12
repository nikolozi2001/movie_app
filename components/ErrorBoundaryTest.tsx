import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenErrorBoundary from './ScreenErrorBoundary';

// Component that intentionally throws an error
const ErrorThrowingComponent = () => {
  const [shouldError, setShouldError] = React.useState(false);

  if (shouldError) {
    throw new Error('This is a test error from ErrorThrowingComponent!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error Boundary Test</Text>
      <Text style={styles.description}>
        Click the button below to trigger an error and see the error boundary in action.
      </Text>

      <TouchableOpacity
        style={styles.errorButton}
        onPress={() => setShouldError(true)}
      >
        <Text style={styles.errorButtonText}>Trigger Error</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => setShouldError(false)}
      >
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main test component wrapped with error boundary
const ErrorBoundaryTest = () => {
  return (
    <ScreenErrorBoundary
      fallbackTitle="Test Error Caught!"
      fallbackMessage="This error was intentionally triggered to demonstrate the error boundary."
      onRetry={() => console.log('Retry clicked')}
    >
      <ErrorThrowingComponent />
    </ScreenErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0D23',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#A8B5DB',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  errorButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    minWidth: 150,
    alignItems: 'center',
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#AB8BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 150,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorBoundaryTest;