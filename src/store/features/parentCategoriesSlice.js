import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../client';

export const getParentCategories = createAsyncThunk('parentCategories/getParentCategories', () => {
  return client.get('parentCategories?_embed=categories')
    .then((res) => res.json())
    .catch((err) => err.message);
});

export const parentCategoriesSlice = createSlice({
  name: 'parentCategories',
  initialState: {
    parentCategories: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.parentCategories = action.payload;
    },
  },
  extraReducers: {
    [getParentCategories.pending]: (state) => {
      state.isLoading = true;
      if(state.errorMessage) state.errorMessage = null;
    },
    [getParentCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.parentCategories = action.payload;
    },
    [getParentCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default parentCategoriesSlice.reducer;
