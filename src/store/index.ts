import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "./features/transactionsSlice";
import allCategoriesSlice from "./features/parentCategoriesSlice";

const store = configureStore({
  reducer: {
    transactions: transactionsSlice,
    parentCategories: allCategoriesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
