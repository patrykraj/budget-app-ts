import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../client';

export const getAllCategories = createAsyncThunk('allCategories/getAllCategories', () => {
  return client.get('categories?_expand=parentCategory')
    .then((res) => res.json())
    .catch((err) => err.message);
});

export const allCategoriesSlice = createSlice({
  name: 'allCategories',
  initialState: {
    allCategories: [],
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
    [getAllCategories.pending]: (state) => {
      state.isLoading = true;
      if(state.errorMessage) state.errorMessage = null;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allCategories = action.payload;

      const parentCategories = action.payload.reduce((acc, {parentCategory}) => {
        return [...acc, parentCategory];
      }, []);
      const uniqueParentCategories = [...new Map(parentCategories.map((item) => [item["id"], item])).values()];
      state.parentCategories = uniqueParentCategories;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default allCategoriesSlice.reducer;
