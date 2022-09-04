import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import renderWithProviders from "../../../utils/testUtils/testUtils";
import BudgetRoutes from "./BudgetRoutes";

describe("BudgetRoutes", () => {
  test("BudgetRoutes should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <BudgetRoutes />
      </BrowserRouter>
    );
  });
});
