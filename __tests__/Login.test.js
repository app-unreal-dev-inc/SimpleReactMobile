import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../src/login";

import { Alert } from "react-native";

jest.spyOn(Alert, "alert");

describe("LoginScreen", () => {
  it("should handle login with correct username and password", () => {
    const navigation = { replace: jest.fn() };
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={navigation} />
    );

    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(usernameInput, "opendoor");
    fireEvent.changeText(passwordInput, "alohomora");
    fireEvent.press(loginButton);

    expect(navigation.replace).toHaveBeenCalledWith("PostList", {
      userId: 1,
    });
  });

  it("should display an error message when username is missing", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(passwordInput, "alohomora");
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Login failed.",
      "Enter all details!"
    );
  });

  it("should display an error message when password is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(usernameInput, "opendoor");
    fireEvent.changeText(passwordInput, "invalidPassword");
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Login failed.",
      "Incorrect password"
    );
  });

  it("should display an error message when username is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(usernameInput, "invalidUsername");
    fireEvent.changeText(passwordInput, "alohomora");
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Login failed.",
      "Incorrect username"
    );
  });
});
