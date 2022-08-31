import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";

import InfoElement from "../InfoElement";
import theme from "../../../../../utils/testUtils/themeMock";
import { budgetPageStrings } from "../../../../../static/constants";

const providerProps = {
  theme,
};

test("InfoElement should render", () => {
  render(
    <ThemeProvider {...providerProps}>
      <InfoElement />
    </ThemeProvider>
  );

  const { budget, spent } = budgetPageStrings;
  expect(screen.getByText(budget)).toBeDefined();
  expect(screen.getByText(spent)).toBeDefined();
  expect(screen.getByRole("listitem")).toBeDefined();
});
