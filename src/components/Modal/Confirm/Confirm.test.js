import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

import Confirm from "./Confirm";
import renderWithProviders from "../../../utils/testUtils/testUtils";
import { transactionsMock } from "../../../utils/testUtils/mocks";
import { confirmStrings } from "../../../static/constants";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
}));

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Confirm", () => {
  test("Confirm should render", () => {
    const abc = renderWithProviders(
      <BrowserRouter>
        <Confirm />
      </BrowserRouter>
    );
    expect(abc).toBeDefined();
  });

  test("Confirm should render content based on url id param", () => {
    const { deleteConfirmation } = confirmStrings;
    renderWithProviders(
      <MemoryRouter initialEntries={["/budget/1"]}>
        <Routes>
          <Route path="/budget/:id" element={<Confirm />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          transactions: {
            transactions: transactionsMock,
          },
        },
      }
    );

    expect(screen.getAllByRole("button").length).toBe(2);
    expect(
      screen.getByText(
        `${deleteConfirmation} ${transactionsMock[0].description}?`
      )
    );
  });

  test("Confirm should dispatch actions on event buttons", async () => {
    const { confirm, cancel } = confirmStrings;
    renderWithProviders(
      <MemoryRouter initialEntries={["/budget/1"]}>
        <Routes>
          <Route path="/budget/:id" element={<Confirm />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          transactions: {
            transactions: transactionsMock,
          },
        },
      }
    );

    const confirmButton = screen.getByRole("button", { name: confirm });
    fireEvent.click(confirmButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    const cancelButton = screen.getByRole("button", { name: cancel });
    fireEvent.click(cancelButton);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });

  test("Confirm should render fallback element if url :id is not a number or transaction not found", () => {
    const { transactionNotFound } = confirmStrings;
    renderWithProviders(
      <MemoryRouter initialEntries={["/budget/abc"]}>
        <Routes>
          <Route path="/budget/:id" element={<Confirm />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          transactions: {
            transactions: [],
          },
        },
      }
    );

    expect(screen.getByText(transactionNotFound));
  });
});
