import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ChildCategory from "../ChildCategory";

const providerProps = {
  category: {
    parentCategoryId: 1,
    id: 2,
    name: "category",
    budget: 1,
  },
  spentAmount: {
    2: 20,
  },
};

describe("<ChildCategory />", () => {
  test("ChildCategory should render", () => {
    render(<ChildCategory {...providerProps} />);
    expect(screen.getByRole("listitem")).toBeDefined();
  });

  test("ChildCategory exceeded value", () => {
    const { container } = render(<ChildCategory {...providerProps} />);

    expect(container.querySelectorAll("span")[2]).toHaveTextContent(
      "PLN 20.00"
    );
    expect(container.getElementsByClassName("data-field").length).toBe(2);
    expect(container.getElementsByClassName("exceed").length).toBe(1);
  });

  test("ChildCategory not exceeded value", () => {
    const props = {
      category: {
        parentCategoryId: 2,
        id: 1,
        name: "category2",
        budget: 2,
      },
      spentAmount: {
        1: 0,
      },
    };
    const { container } = render(<ChildCategory {...props} />);

    expect(container.getElementsByClassName("data-field").length).toBe(2);
    expect(container.getElementsByClassName("exceed").length).toBe(0);
  });
});
