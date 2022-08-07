import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "./features/transactionsSlice";
import allCategoriesSlice from "./features/parentCategoriesSlice";

export default configureStore({
  reducer: {
    transactions: transactionsSlice,
    parentCategories: allCategoriesSlice,
  },
});
