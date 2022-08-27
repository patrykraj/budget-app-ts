import React from "react";
import { render, screen, expect } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// beforeEach(() => {
//   wrapped = <App />;
// });

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
