import React, { useCallback, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { usePullToRefresh } from '../hooks/usePullToRefresh';

// Example component showing different pull-to-refresh implementations
const PullToRefreshExamples = () => {
  const [basicRefreshing, setBasicRefreshing] = useState(false);
  const [data, setData] = useState('Initial data');

  // Basic implementation
  const onBasicRefresh = useCallback(async () => {
    setBasicRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData(`Updated at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      console.error('Basic refresh error:', error);
    } finally {
      setBasicRefreshing(false);
    }
  }, []);

  // Using custom hook
  const { refreshing: hookRefreshing, refreshControlProps } = usePullToRefresh({
    onRefresh: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData(`Hook updated at ${new Date().toLocaleTimeString()}`);
    }
  });

  // Advanced implementation with multiple data sources
  const [multiData, setMultiData] = useState<{
    users: any[];
    posts: any[];
    lastUpdated: Date | null;
  }>({
    users: [],
    posts: [],
    lastUpdated: null
  });

  const onMultiRefresh = useCallback(async () => {
    try {
      const [usersResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      ]);

      const users = await usersResponse.json();
      const posts = await postsResponse.json();

      setMultiData({
        users,
        posts,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Multi-refresh error:', error);
    }
  }, []);

  const { refreshing: multiRefreshing, onRefresh: multiOnRefresh } = usePullToRefresh({
    onRefresh: onMultiRefresh
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Pull-to-Refresh</Text>
        <Text style={styles.dataText}>{data}</Text>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={basicRefreshing}
              onRefresh={onBasicRefresh}
              colors={["#AB8BFF"]}
              tintColor="#AB8BFF"
              title="Refreshing..."
              titleColor="#AB8BFF"
            />
          }
        >
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Pull down to refresh this basic example. It simulates a 2-second API call.
            </Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Hook Implementation</Text>

        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl {...refreshControlProps} />}
        >
          <View style={styles.content}>
            <Text style={styles.contentText}>
              This uses the custom usePullToRefresh hook for cleaner code.
            </Text>
            <Text style={styles.dataText}>
              Status: {hookRefreshing ? 'Refreshing...' : 'Ready'}
            </Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiple Data Sources</Text>
        <Text style={styles.dataText}>
          Users: {multiData.users.length} | Posts: {multiData.posts.length}
        </Text>
        {multiData.lastUpdated && (
          <Text style={styles.timestamp}>
            Last updated: {multiData.lastUpdated.toLocaleTimeString()}
          </Text>
        )}

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={multiRefreshing}
              onRefresh={multiOnRefresh}
              colors={["#AB8BFF", "#FF6B6B"]}
              tintColor="#AB8BFF"
              title="Loading data..."
              titleColor="#AB8BFF"
            />
          }
        >
          <View style={styles.content}>
            <Text style={styles.contentText}>
              This example refreshes multiple data sources concurrently using Promise.all().
            </Text>
            <TouchableOpacity
              style={styles.manualRefreshButton}
              onPress={multiOnRefresh}
            >
              <Text style={styles.buttonText}>Manual Refresh</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0D23',
  },
  section: {
    margin: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  scrollView: {
    height: 120,
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
  },
  content: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: '#A8B5DB',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  dataText: {
    color: '#AB8BFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  timestamp: {
    color: '#A8B5DB',
    fontSize: 12,
    marginBottom: 8,
  },
  manualRefreshButton: {
    backgroundColor: '#AB8BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PullToRefreshExamples;