import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Define the PostDetailsScreen component
const PostDetailsScreen = ({ route }) => {
// Handle null values or missing properties
if (!route || !route.params || !route.params.post) {
    return <View/>;
  }
// Destructure the title and body properties from the post object
  const { title, body } = route.params.post;
// Render the component
  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postBody}>{body}</Text>
    </View>
  );
};

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  postTitle: {
    flex: 0.3,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "justify",
  },
  postBody: {
    flex: 0.7,
    fontSize: 20,
    fontWeight: "normal",
    marginBottom: 10,
    textAlign: "left",
  },
});

// Export the PostDetailsScreen component
export default PostDetailsScreen;