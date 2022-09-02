import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import renderWithProviders from "../../utils/testUtils/testUtils";
import Budget from "./Budget";
import { transactionStrings } from "../../static/constants";

describe("Budget", () => {
  const { addNewTransaction } = transactionStrings;

  test("Budget should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <Budget />
      </BrowserRouter>
    );

    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByText(addNewTransaction)).toBeDefined();
  });

  test("Budget should return error handler if error", () => {
    renderWithProviders(
      <BrowserRouter>
        <Budget />
      </BrowserRouter>,
      {
        preloadedState: {
          parentCategories: {
            categoriesErrorMessage: "error",
          },
        },
      }
    );

    expect(screen.getAllByRole("heading").length).toBe(3);
    expect(screen.getByText("error")).toBeDefined();
  });
});
