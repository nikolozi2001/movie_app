import { useEffect, useState } from 'react';

interface UseSkeletonOptions {
  delay?: number; // Delay before showing skeleton (prevents flash)
  minDuration?: number; // Minimum time to show skeleton
}

interface UseSkeletonReturn {
  showSkeleton: boolean;
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useSkeleton = (
  loading: boolean,
  options: UseSkeletonOptions = {}
): UseSkeletonReturn => {
  const { delay = 100, minDuration = 300 } = options;
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (loading) {
      setStartTime(Date.now());
      const timer = setTimeout(() => {
        setShowSkeleton(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      if (showSkeleton && startTime) {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDuration - elapsed);

        const timer = setTimeout(() => {
          setShowSkeleton(false);
          setStartTime(null);
        }, remaining);

        return () => clearTimeout(timer);
      } else {
        setShowSkeleton(false);
        setStartTime(null);
      }
    }
  }, [loading, showSkeleton, startTime, delay, minDuration]);

  const startLoading = () => {
    setStartTime(Date.now());
    setShowSkeleton(true);
  };

  const stopLoading = () => {
    setShowSkeleton(false);
    setStartTime(null);
  };

  return {
    showSkeleton,
    isLoading: loading,
    startLoading,
    stopLoading,
  };
};