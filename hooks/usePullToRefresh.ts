import { useCallback, useState } from 'react';

interface UsePullToRefreshOptions {
  onRefresh?: () => Promise<void> | void;
  enabled?: boolean;
}

interface UsePullToRefreshReturn {
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  refreshControlProps: {
    refreshing: boolean;
    onRefresh: () => Promise<void>;
    colors?: string[];
    tintColor?: string;
    title?: string;
    titleColor?: string;
  };
}

export const usePullToRefresh = (
  options: UsePullToRefreshOptions = {}
): UsePullToRefreshReturn => {
  const { onRefresh: customOnRefresh, enabled = true } = options;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (!enabled) return;

    setRefreshing(true);
    try {
      if (customOnRefresh) {
        await customOnRefresh();
      }
    } catch (error) {
      console.error('Error during pull-to-refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, [customOnRefresh, enabled]);

  const refreshControlProps = {
    refreshing,
    onRefresh,
    colors: ["#AB8BFF"],
    tintColor: "#AB8BFF",
    title: "Refreshing...",
    titleColor: "#AB8BFF",
  };

  return {
    refreshing,
    onRefresh,
    refreshControlProps,
  };
};