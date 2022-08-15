import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../client";
import { userId } from "../../static/constants";
import { calcSpentAmount } from "../../utils";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  () => {
    return client
      .get(`transactions?budgetId=${userId}&_expand=category`)
      .then((res) => res.json())
      .catch((err) => err.message);
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  (data) => {
    return client
      .post(`budgets/${userId}/transactions`, data)
      .then((res) => res.json())
      .then((resData) => resData)
      .catch((err) => err.message);
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    spentAmount: {},
    isTransactionsLoading: true,
    transactionsErrorMessage: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: {
    [getTransactions.pending]: (state) => {
      state.isTransactionsLoading = true;
      if (state.transactionsErrorMessage) state.transactionsErrorMessage = null;
    },
    [addTransaction.pending]: (state) => {
      state.isTransactionsLoading = true;
    },
    [getTransactions.fulfilled]: (state, { payload }) => {
      const spentValues = calcSpentAmount(payload);

      state.spentAmount = spentValues;
      state.transactions = payload;
      state.isTransactionsLoading = false;
    },
    [addTransaction.fulfilled]: (state, { payload }) => {
      state.transactions.push(payload);

      const spentValues = calcSpentAmount(state.transactions);
      state.spentAmount = spentValues;
      state.isTransactionsLoading = false;
    },
    [getTransactions.rejected]: (state, action) => {
      state.transactionsErrorMessage = action.payload;
      state.isTransactionsLoading = false;
    },
    [addTransaction.rejected]: (state, { payload }) => {
      state.transactionsErrorMessage = payload;
      state.isTransactionsLoading = false;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
