import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";
import store from "./store";

test("App renders router links", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElements = screen.getAllByRole("link");
  expect(linkElements.length).toBe(2);
});
