import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "../../../../../utils/testUtils";
import TransactionElement from "../TransactionElement";

const providerProps = {
  id: 1,
  description: "description",
  amount: 1,
  date: "2015-01-01",
  category: "category",
};

describe("TransactionElement", () => {
  //   test("TransactionElement should render", () => {
  //     render(
  //       <BrowserRouter>
  //         <Routes>
  //           <Route
  //             exact
  //             path="/"
  //             element={<TransactionElement {...providerProps} />}
  //           />
  //         </Routes>
  //       </BrowserRouter>
  //     );

  //     expect(screen.getByRole("row")).toBeDefined();
  //     expect(screen.getAllByRole("cell").length).toBe(5);
  //   });

  test("TransactionElement delete button should redirect to delete form", async () => {
    const { history } = render(<TransactionElement {...providerProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(history.location.pathname).toBe("/budget/transaction/delete/1");
  });
});
