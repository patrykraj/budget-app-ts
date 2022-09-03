import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import Modal from "./Modal";
import renderWithProviders from "../../utils/testUtils/testUtils";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Modal", () => {
  test("Modal shows children and a close button", () => {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal");
    document.body.appendChild(portalRoot);

    renderWithProviders(
      <BrowserRouter>
        <Modal>
          <p>content</p>
        </Modal>
      </BrowserRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("content")).toBeDefined();
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
