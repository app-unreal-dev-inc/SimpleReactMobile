// Import necessary modules from React Native
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";

// Create the PostListScreen component
const PostListScreen = ({ route, navigation }) => {
  // Initialize state variables
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { userId } = route.params;

  // Function to fetch posts from API
  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data.filter((d) => d.userId === userId));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Call the fetchPosts function when the component mounts or when fetchPosts changes
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Function to handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, []);

  // Function to render each post item
  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      key={`postitem-${item?.id?.toString()}`}
      testID={`postitem-${item?.id?.toString()}`}
      style={styles.postItem}
      onPress={() => navigation.navigate("PostDetails", { post: item })}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </TouchableOpacity>
  );

  // Render the PostListScreen component
  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={handleRefresh} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.id?.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postItem: {
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "black",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    color: "gray",
  },
});

// Export the PostListScreen component
export default PostListScreen;
