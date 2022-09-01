import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import renderWithProviders from "../../../../../utils/testUtils/testUtils";
import TransactionElement from "../TransactionElement";

const providerProps = {
  id: 1,
  description: "description",
  amount: 1,
  date: "2015-01-01",
  category: "category",
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("TransactionElement", () => {
  test("TransactionElement should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <TransactionElement {...providerProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("row")).toBeDefined();
    expect(screen.getAllByRole("cell").length).toBe(5);
  });

  test("TransactionElement click on transaction should redirect to update form", async () => {
    renderWithProviders(
      <BrowserRouter>
        <TransactionElement {...providerProps} />
      </BrowserRouter>
    );

    const button = screen.getByRole("row");
    fireEvent.click(button);
    await expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
