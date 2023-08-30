import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import PostListScreen from "../src/posts";

describe("PostListScreen", () => {
  test("fetchPosts should fetch posts and update the state", async () => {
    const { getByText, findByText } = render(
      <PostListScreen route={{ params: { userId: 1 } }} />
    );

    await waitFor(() => getByText("eum et est occaecati"));

    // Assert that the posts are rendered correctly
    expect(getByText("eum et est occaecati")).toBeTruthy();
    expect(findByText("ullam et saepe reiciendis voluptatem")).toBeTruthy();
  });

  test("handleRefresh should refresh the posts", async () => {
    const { getByText, findByText } = render(
      <PostListScreen route={{ params: { userId: 1 } }} />
    );

    await waitFor(() => getByText("eum et est occaecati"));

    fireEvent.press(getByText("Refresh"));

    await waitFor(() => getByText("nesciunt quas odio"));

    // Assert that the refreshed posts are rendered correctly
    expect(getByText("nesciunt quas odio")).toBeTruthy();
    expect(findByText("repudiandae veniam quaerat sunt sed")).toBeTruthy();
  });

  test("renderPostItem should navigate to PostDetails screen on press", async () => {
    const navigation = { navigate: jest.fn() };
    const { getByText, getByTestId } = render(
      <PostListScreen
        navigation={navigation}
        route={{ params: { userId: 1 } }}
      />
    );

    await waitFor(() => getByText("nesciunt quas odio"));

    fireEvent.press(getByTestId("postitem-1"));

    // Assert that the navigation to PostDetails screen is triggered
    expect(navigation.navigate).toBeTruthy()
  });
});
