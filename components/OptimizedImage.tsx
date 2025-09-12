import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface OptimizedImageProps {
  source: { uri: string } | number;
  style?: any;
  className?: string;
  placeholder?: string;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  transition?: number | { duration?: number; timing?: 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear' };
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  onLoad?: () => void;
  onError?: () => void;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  tintColor?: string;
  priority?: 'low' | 'normal' | 'high';
  cachePolicy?: 'memory' | 'disk' | 'memory-disk';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  style,
  className,
  placeholder,
  contentFit = 'cover',
  transition = 200,
  resizeMode,
  onLoad,
  onError,
  testID,
  accessible,
  accessibilityLabel,
  tintColor,
  priority = 'normal',
  cachePolicy = 'memory-disk',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle source prop - expo-image expects specific format
  const imageSource = React.useMemo(() => {
    if (typeof source === 'number') {
      // For local assets, we need to require them
      return source;
    } else if (typeof source === 'object' && source.uri) {
      // Remote URI
      return { uri: source.uri };
    }
    return undefined;
  }, [source]);

  // Handle placeholder
  const placeholderSource = React.useMemo(() => {
    if (placeholder && typeof placeholder === 'string') {
      return { uri: placeholder };
    }
    return undefined;
  }, [placeholder]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  if (hasError) {
    return (
      <View
        style={[style, styles.errorContainer]}
        className={className}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      >
        <Ionicons name="image-outline" size={24} color="#666" />
      </View>
    );
  }

  if (!imageSource) {
    return (
      <View
        style={[style, styles.errorContainer]}
        className={className}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      >
        <Ionicons name="image-outline" size={24} color="#666" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]} className={className}>
      <Image
        source={imageSource}
        style={styles.image}
        placeholder={placeholderSource}
        contentFit={contentFit}
        transition={transition}
        priority={priority}
        cachePolicy={cachePolicy}
        onLoad={handleLoad}
        onError={handleError}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        tintColor={tintColor}
        {...props}
      />

      {/* Loading overlay */}
      {isLoading && !hasError && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#AB8BFF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 62, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
});

export default OptimizedImage;