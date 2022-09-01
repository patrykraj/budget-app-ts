/* eslint-disable react/prop-types */
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Router } from "react-router";

import transactionsSlice from "../../store/features/transactionsSlice";
import allCategoriesSlice from "../../store/features/parentCategoriesSlice";

function render(
  ui,
  {
    preloadedState = {},
    routeHistory,
    initialRouteIndex,
    ...renderOptions
  } = {}
) {
  const history = createMemoryHistory({
    initialEntries: routeHistory,
    initialIndex: initialRouteIndex,
  });
  const Wrapper = ({ children }) => {
    const store = configureStore({
      reducer: {
        transactions: transactionsSlice,
        parentCategories: allCategoriesSlice,
      },
      preloadedState,
    });

    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  };
  const rtlRenderObject = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  return { ...rtlRenderObject, history };
}

export * from "@testing-library/react";
export { render };
