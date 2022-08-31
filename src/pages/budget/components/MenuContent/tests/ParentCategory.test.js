import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ParentCategory from "../ParentCategory";
import {
  allCategoriesMock,
  parentCategoriesMock,
} from "../../../../../utils/testUtils/categoriesSliceMock";
import renderWithProviders from "../../../../../utils/testUtils/testUtils";

const preloadedProps = {
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

describe("<ParentCategory />", () => {
  test("ParentCategory should render", () => {
    renderWithProviders(
      <ParentCategory
        id={1}
        name="name"
        active={false}
        items={[]}
        noExtend
        summary
      />,
      {
        preloadedState: {},
      }
    );

    expect(screen.getAllByRole("listitem").length).toBe(1);
  });

  describe("ParentCategory conditional test", () => {
    test("ParentCategory should render parent categories list if active", () => {
      renderWithProviders(
        <ParentCategory
          id={parentCategoriesMock[0].id}
          name={parentCategoriesMock[0].name}
          items={allCategoriesMock}
          noExtend={false}
          active
        />,
        {
          preloadedState: preloadedProps,
        }
      );

      expect(screen.getAllByRole("list").length).toBe(1);
      expect(screen.getAllByRole("listitem").length).toBe(
        parentCategoriesMock.length + 1
      );
    });

    test("ActiveParentCategoryId should hide child categories list on click if active", () => {
      const { rerender } = renderWithProviders(
        <ParentCategory
          id={parentCategoriesMock[0].id}
          name={parentCategoriesMock[0].name}
          items={allCategoriesMock}
          noExtend={false}
          active
        />,
        {
          preloadedState: preloadedProps,
        }
      );

      expect(screen.getAllByRole("listitem").length).toBe(
        parentCategoriesMock.length + 1
      );
      const button = screen.getByRole("button");
      fireEvent.click(button);

      rerender(
        <ParentCategory
          id={parentCategoriesMock[0].id}
          name={parentCategoriesMock[0].name}
          items={allCategoriesMock}
          noExtend={false}
          active={false}
        />,
        {
          preloadedState: preloadedProps,
        }
      );

      expect(screen.getAllByRole("listitem").length).toBe(1);
    });
  });

  test("ActiveParentCategoryId should add all categories if is inactive and is summary", () => {
    const { rerender } = renderWithProviders(
      <ParentCategory
        id={parentCategoriesMock[0].id}
        name={parentCategoriesMock[0].name}
        items={allCategoriesMock}
        active={false}
        noExtend
        summary
      />,
      {
        preloadedState: preloadedProps,
      }
    );

    expect(screen.getAllByRole("listitem").length).toBe(1);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    rerender(
      <ParentCategory
        id={parentCategoriesMock[0].id}
        name={parentCategoriesMock[0].name}
        items={allCategoriesMock}
        noExtend={false}
        active
      />,
      {
        preloadedState: preloadedProps,
      }
    );

    expect(screen.getAllByRole("listitem").length).toBe(
      parentCategoriesMock.length + 1
    );
  });

  test("ActiveParentCategoryId should add current category if inactive", () => {
    const { rerender } = renderWithProviders(
      <ParentCategory
        id={parentCategoriesMock[0].id}
        name={parentCategoriesMock[0].name}
        items={allCategoriesMock}
        noExtend={false}
        active={false}
      />,
      {
        preloadedState: preloadedProps,
      }
    );

    expect(screen.getAllByRole("listitem").length).toBe(1);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    rerender(
      <ParentCategory
        id={parentCategoriesMock[0].id}
        name={parentCategoriesMock[0].name}
        items={allCategoriesMock}
        noExtend={false}
        active
      />,
      {
        preloadedState: preloadedProps,
      }
    );

    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(4);
  });
});
