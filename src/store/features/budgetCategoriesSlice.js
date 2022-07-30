import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../client';

export const getBudgetCategories = createAsyncThunk('budgetCategories/getBudgetCategories', () => {
  return client.get('budgetCategories')
    .then((res) => res.json())
    .catch((err) => err.message);
});

export const budgetCategoriesSlice = createSlice({
  name: 'budgetCategories',
  initialState: {
    budgetCategories: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.budgetCategories = action.payload;
    },
  },
  extraReducers: {
    [getBudgetCategories.pending]: (state) => {
      state.isLoading = true;
      if(state.errorMessage) state.errorMessage = null;
    },
    [getBudgetCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.budgetCategories = action.payload;
    },
    [getBudgetCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default budgetCategoriesSlice.reducer;
