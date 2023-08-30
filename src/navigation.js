import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./login";
import PostListScreen from "./posts";
import PostDetailsScreen from "./post";

const Stack = createStackNavigator();

// Navigation component
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Login screen */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Post list screen */}
        <Stack.Screen name="PostList" component={PostListScreen} options={{ title: 'Posts' }} />

        {/* Post details screen */}
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: 'Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
