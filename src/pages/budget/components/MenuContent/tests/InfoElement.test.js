import React from "react";
import { render, screen } from "@testing-library/react";
import InfoElement from "../InfoElement";

import { budgetPageStrings } from "../../../../../static/constants";

// const providerProps = {};

describe("InfoElement", () => {
  it("should render", () => {
    const { budget, spent } = budgetPageStrings;

    render(<InfoElement />);
    expect(screen.getByText(budget)).toBeDefined();
    expect(screen.getByText(spent)).toBeDefined();
  });

  // it('should be hidden if not the active payment', () => {
  //     const {container} = render(<AffirmContent isSelected={false} />, {
  //         providerProps,
  //     });
  //     expect(container.querySelector('.hidden')).not.toBeNull();
  // });
});
