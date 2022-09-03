import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import Button from "./Button";
import { buttonTypes, formStrings } from "../../static/constants";
import renderWithProviders from "../../utils/testUtils/testUtils";

describe("Button", () => {
  const { cross, regular, inline } = buttonTypes;
  const { submitButton } = formStrings;

  const onclick = jest.fn();

  test("Button should render", () => {
    renderWithProviders(<Button>{submitButton}</Button>);
    expect(screen.getByText(submitButton)).toBeDefined();
  });

  test("Button should be disabled when loading", () => {
    renderWithProviders(
      <Button type={regular} loading>
        {submitButton}
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("Button should be cross and invoke onclick function", async () => {
    renderWithProviders(<Button type={cross} onclick={onclick} />);

    const button = screen.getByRole("button");
    expect(button.textContent).toBe("×");
    fireEvent.click(button);
    await expect(onclick).toHaveBeenCalledTimes(1);
  });

  test("Button should be a link", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Button type={inline} onclick={onclick} to="/budget">
          Budget
        </Button>
      </BrowserRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    await expect(onclick).toHaveBeenCalledTimes(1);
  });

  test("Button should be a link but do not invoke onclick", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Button type={cross} to="/transaction">
          Budget
        </Button>
      </BrowserRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    await expect(onclick).toHaveBeenCalledTimes(0);
  });
});
