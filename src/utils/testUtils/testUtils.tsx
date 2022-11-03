import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { themeMock } from "./mocks";
import transactionsSlice from "../../store/features/transactionsSlice";
import allCategoriesSlice from "../../store/features/parentCategoriesSlice";

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        transactions: transactionsSlice,
        parentCategories: allCategoriesSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>{children}</ThemeProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProviders;
