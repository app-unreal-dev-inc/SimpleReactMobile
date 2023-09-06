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

import { connect } from "react-redux";
import { fetchDataRequest } from "./actions";

// Create the PostListScreen component
const PostListScreen = ({
  route,
  navigation,
  fetchDataRequest,
  loading,
  posts,
  refreshing,
}) => {
  // Initialize state variables
  // const [loading, setLoading] = useState(false);
  // const [posts, setPosts] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);

  const { userId } = route.params;

  // Function to fetch posts from API
  const fetchPosts = useCallback(async () => {
    try {
      fetchDataRequest({ userId });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch posts");
    } finally {
    }
  }, [userId, fetchDataRequest]);

  // Call the fetchPosts function when the component mounts or when userId changes
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Function to handle refresh
  const handleRefresh = useCallback(() => {
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

// Map Redux state to component props
const mapStateToProps = (state) => {
  const { data } = state;
  console.log("mapStateToProps:: ", data);
  return {
    posts: data.posts,
    loading: data.loading,
    refreshing: data.refreshing,
  };
};

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => ({
  fetchDataRequest: (userId) => dispatch(fetchDataRequest(userId)),
});

// Connect the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(PostListScreen);
