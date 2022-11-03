import React from "react";
import { screen, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import TransactionsTable from "../TransactionsTable";
import { transactionsMock } from "../../../../../utils/testUtils/mocks";
import renderWithProviders from "../../../../../utils/testUtils/testUtils";

import { transactionStrings } from "../../../../../static/constants";

describe("TransactionsTable", () => {
  test("TransactionsTable should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <TransactionsTable
          transactions={transactionsMock}
          activeParentCategoryId={[1]}
        />
      </BrowserRouter>
    );

    expect(screen.getByRole("table")).toBeDefined();
    expect(screen.getAllByRole("columnheader").length).toBe(4);
    expect(screen.getAllByRole("cell")).toBeDefined();
  });

  test("TransactionsTable should return null with no props", () => {
    renderWithProviders(
      <BrowserRouter>
        <TransactionsTable transactions={[]} activeParentCategoryId={[]} />
      </BrowserRouter>
    );

    expect(screen.queryByRole("table")).toBe(null);
  });

  test("TransactionsTable should sort the list by selected category", () => {
    const { descriptionHeader, categoryHeader, amountHeader } =
      transactionStrings.transactionsHeaders;

    const { container } = renderWithProviders(
      <BrowserRouter>
        <TransactionsTable
          transactions={transactionsMock}
          activeParentCategoryId={[1, 2, 3]}
        />
      </BrowserRouter>
    );

    const descriptionButton = getByText(container, descriptionHeader.header);
    const categoryButton = getByText(container, categoryHeader.header);
    const amountButton = getByText(container, amountHeader.header);

    fireEvent.click(descriptionButton);
    expect(descriptionButton).toHaveClass("active");
    expect(categoryButton).not.toHaveClass("active");
    expect(amountButton).not.toHaveClass("active");

    fireEvent.click(categoryButton);
    expect(descriptionButton).not.toHaveClass("active");
    expect(categoryButton).toHaveClass("active");
    expect(amountButton).not.toHaveClass("active");

    fireEvent.click(amountButton);
    expect(descriptionButton).not.toHaveClass("active");
    expect(categoryButton).not.toHaveClass("active");
    expect(amountButton).toHaveClass("active");
  });
});
