import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";
import renderWithProviders from "./utils/testUtils/testUtils";

test("App should render", () => {
  renderWithProviders(<App />);
  const linkElements = screen.getAllByRole("link");
  expect(linkElements.length).toBe(2);
});
