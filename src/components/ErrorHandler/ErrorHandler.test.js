import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ErrorHandler from "./ErrorHandler";
import renderWithProviders from "../../utils/testUtils/testUtils";

describe("ErrorHandler", () => {
  test("ErrorHandler should render", () => {
    renderWithProviders(<ErrorHandler>404</ErrorHandler>);
    expect(screen.getByText("404")).toBeDefined();
  });
});
