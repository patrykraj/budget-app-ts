import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from './features/transactionsSlice';
import allCategoriesSlice from './features/parentCategoriesSlice';
import budgetCategoriesSlice from './features/budgetCategoriesSlice';

export default configureStore({
  reducer: {
    transactions: transactionsSlice,
    parentCategories: allCategoriesSlice,
    budgetCategories: budgetCategoriesSlice,
  },
});
