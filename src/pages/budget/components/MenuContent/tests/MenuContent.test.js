import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import MenuContent from "../MenuContent";
import {
  allCategoriesMock,
  parentCategoriesMock,
} from "../../../../../utils/testUtils/mocks";
import renderWithProviders from "../../../../../utils/testUtils/testUtils";

describe("<MenuContent />", () => {
  const initialBudgetedParentCategories = {
    0: 1,
    1: 2,
    2: 3,
  };

  const preloadedProps = {
    parentCategories: {
      budgetedParentCategories: initialBudgetedParentCategories,
    },
    transactions: {
      spentAmount: {
        parentCategories: {
          0: 1,
          1: 2,
          2: 3,
        },
      },
    },
  };

  renderWithProviders(
    <MenuContent
      isLoading={false}
      allCategories={allCategoriesMock}
      parentCategories={parentCategoriesMock}
    />,
    {
      preloadedState: preloadedProps,
    }
  );

  test("MenuContent should render", () => {
    expect(screen.getByRole("list")).toBeDefined();
  });

  test("MenuContent should render", () => {
    renderWithProviders(
      <MenuContent
        isLoading
        allCategories={allCategoriesMock}
        parentCategories={parentCategoriesMock}
        activeParentCategoryId={[1]}
      />,
      {
        preloadedState: preloadedProps,
      }
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
