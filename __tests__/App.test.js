import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);
  });
  it("renders no component", () => {
    const { queryByTestId } = render(<App />);

    // Negative test case: Navigation component should not have a child element with testID "invalid-component"
    const invalidComponent = queryByTestId("invalid-component");
    expect(invalidComponent).toBeNull();
  });
});
