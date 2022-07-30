import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../client';

export const getTransactions = createAsyncThunk('transactions/getTransactions', () => {
  return client.get('transactions?_expand=category')
    .then((res) => res.json())
    .catch((err) => err.message);
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: {
    [getTransactions.pending]: (state) => {
      state.isLoading = true;
      if(state.errorMessage) state.errorMessage = null;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
    },
    [getTransactions.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
