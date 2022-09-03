import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ThemeSwitch from "./ThemeSwitch";
import renderWithProviders from "../../utils/testUtils/testUtils";

describe("ThemeSwitch", () => {
  const setIsDefaultTheme = jest.fn();
  test("ThemeSwitch should switch selected theme", () => {
    renderWithProviders(
      <ThemeSwitch
        setIsDefaultTheme={setIsDefaultTheme}
        isDefaultTheme={false}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(setIsDefaultTheme).toHaveBeenCalledTimes(1);
  });
});
