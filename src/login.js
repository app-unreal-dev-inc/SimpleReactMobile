import React, { useState, useMemo } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import { userList } from "./constants";

const LoginScreen = ({ navigation }) => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    // Check if username and password match
    if (username === "" || password === "") {
      Alert.alert("Login failed.", "Enter all details!");
      return;
    }
    const user = userList[username.toLocaleLowerCase()];
    if (user && user.userid) {
      if (password !== user.password) {
        Alert.alert("Login failed.", "Incorrect password");
        return;
      }
      Alert.alert("Login successful.");
      // Navigate to PostList screen
      navigation.replace("PostList", { userId: user.userid });
    } else {
      Alert.alert("Login failed.", "Incorrect username");
    }
  };

  const memoizedUsernameInput = useMemo(
    () => (
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
    ),
    [username]
  );

  const memoizedPasswordInput = useMemo(
    () => (
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    ),
    [password]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Welcome!!</Text>
      {memoizedUsernameInput}
      {memoizedPasswordInput}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "8%",
  },
  input: {
    width: "100%",
    height: "8%",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: "8%",
    paddingHorizontal: "2%",
  },
  label: {
    width: "100%",
    height: "6%",
    marginBottom: "8%",
    paddingHorizontal: "2%",
    textAlign: "center",
    fontSize: 24,
  },
});

export default LoginScreen;
