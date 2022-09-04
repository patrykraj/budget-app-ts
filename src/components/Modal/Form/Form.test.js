import React from "react";
import { screen, fireEvent, createEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

import Form from "./Form";
import renderWithProviders from "../../../utils/testUtils/testUtils";
import {
  allCategoriesMock,
  transactionsMock,
} from "../../../utils/testUtils/mocks";
import { transactionStrings } from "../../../static/constants";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
}));

describe("Form", () => {
  test("Form should render", () => {
    const form = renderWithProviders(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );
    expect(form).toBeDefined();
  });

  test("Form should update transaction on click", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/budget/1"]}>
        <Routes>
          <Route path="/budget/:id" element={<Form isTransactionUpdate />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          transactions: {
            transactions: transactionsMock,
          },
          parentCategories: {
            isCategoriesLoading: false,
            allCategories: allCategoriesMock,
          },
        },
      }
    );

    expect(screen.getAllByRole("textbox").length).toBe(2);

    const datePicker = screen.getByRole("textbox", { name: "" });
    fireEvent.change(datePicker, { target: { value: "2015-01" } });
    const keyDownEvent = createEvent.keyDown(datePicker);
    fireEvent(datePicker, keyDownEvent);
    expect(keyDownEvent.defaultPrevented).toBe(true);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    await expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test("Form should add transaction on click", () => {
    const {
      descriptionHeader: { header },
    } = transactionStrings.transactionsHeaders;

    renderWithProviders(
      <BrowserRouter>
        <Form />
      </BrowserRouter>,
      {
        preloadedState: {
          transactions: {
            transactions: transactionsMock,
          },
          parentCategories: {
            isCategoriesLoading: false,
            allCategories: allCategoriesMock,
          },
        },
      }
    );

    const descriptionBox = screen.getByRole("textbox", { name: header });
    fireEvent.change(descriptionBox, {
      target: { value: "shoes" },
    });
    expect(descriptionBox.value).toBe("shoes");

    const selectBox = screen.getByRole("combobox");
    fireEvent.change(selectBox, {
      target: { value: "1" },
    });
    expect(selectBox.value).toBe("1");
  });
});
