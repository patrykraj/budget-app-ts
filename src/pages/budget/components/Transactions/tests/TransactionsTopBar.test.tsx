import React from "react";
import { screen, fireEvent, createEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { transactionStrings } from "../../../../../static/constants";

import renderWithProviders from "../../../../../utils/testUtils/testUtils";
import TransactionsTopBar from "../TransactionsTopBar";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
}));

beforeEach(() => {
  renderWithProviders(
    <BrowserRouter>
      <TransactionsTopBar />
    </BrowserRouter>
  );
});

describe("TransactionsTopBar", () => {
  const { addNewTransaction } = transactionStrings;

  test("TransactionsTopBar should render", () => {
    expect(screen.getByText(addNewTransaction)).toBeDefined();
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  test("TransactionsTopBar should dispatch new date on change", async () => {
    const datePicker = screen.getByRole("textbox");
    fireEvent.change(datePicker, { target: { value: "2015-01" } });

    await expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  test("TransactionsTopBar should prevent key down event", () => {
    const datePicker = screen.getByRole("textbox");
    const keyDownEvent = createEvent.keyDown(datePicker);
    fireEvent(datePicker, keyDownEvent);
    expect(keyDownEvent.defaultPrevented).toBe(true);
  });
});
