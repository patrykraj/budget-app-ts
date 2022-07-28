import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from './features/transactionsSlice';
import parentCategoriesSlice from './features/parentCategoriesSlice';

export default configureStore({
  reducer: {
    transactions: transactionsSlice,
    parentCategories: parentCategoriesSlice,
  },
});
