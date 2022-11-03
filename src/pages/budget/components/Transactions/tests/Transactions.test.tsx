import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import Transactions from "../Transactions";
import renderWithProviders from "../../../../../utils/testUtils/testUtils";
import { transactionsMock } from "../../../../../utils/testUtils/mocks";

test("Transactions should render", () => {
  renderWithProviders(
    <BrowserRouter>
      <Transactions
        transactions={transactionsMock}
        activeParentCategoryId={[1, 2, 3]}
      />
    </BrowserRouter>
  );

  expect(screen.getByRole("textbox")).toBeDefined();
});
