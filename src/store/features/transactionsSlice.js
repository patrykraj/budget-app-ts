import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../client";
import { userId } from "../../static/constants";
import {
  calcSpentAmount,
  prepareNewTransaction,
  prepareDates,
} from "../../utils";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  (_, { getState }) => {
    const {
      transactions: { selectedDates },
    } = getState();

    return client
      .get(
        `transactions?date_gte=${selectedDates.startDate}&date_lte=${selectedDates.endDate}&budgetId=${userId}&_expand=category`
      )
      .then((res) => res.json())
      .catch((err) => err.message);
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  (data, { getState }) => {
    const { parentCategories } = getState();
    return client
      .post(`budgets/${userId}/transactions`, data)
      .then((res) => res.json())
      .then((resData) => {
        const preparedTransaction = prepareNewTransaction(
          { ...resData },
          parentCategories.allCategories
        );
        return preparedTransaction;
      })
      .catch((err) => err.message);
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  (id) => {
    return client
      .delete(`transactions/${id}`)
      .then(() => id)
      .catch((err) => err.message);
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  (transaction) => {
    const { id } = transaction;

    return client
      .patch(`budgets/${userId}/transactions/${id}`, transaction)
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
    selectedDates: {
      ...prepareDates(),
    },
  },
  reducers: {
    setSelectedDates: (state, { payload }) => {
      state.selectedDates = {
        ...payload,
      };
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
    [deleteTransaction.pending]: (state) => {
      state.isTransactionsLoading = true;
    },
    [updateTransaction.pending]: (state) => {
      state.isTransactionsLoading = true;
    },
    [getTransactions.fulfilled]: (state, { payload }) => {
      const spentValues = calcSpentAmount(payload);
      state.spentAmount = spentValues;
      state.transactions = payload;
      state.isTransactionsLoading = false;
    },
    [addTransaction.fulfilled]: (state, { payload }) => {
      const payloadDate = new Date(payload.date).getTime();
      const { startDate, endDate } = state.selectedDates;

      if (
        payloadDate >= new Date(startDate).getTime() &&
        payloadDate < new Date(endDate).getTime()
      ) {
        state.transactions.push(payload);
        const spentValues = calcSpentAmount(state.transactions);
        state.spentAmount = spentValues;
      }
      state.isTransactionsLoading = false;
    },
    [deleteTransaction.fulfilled]: (state, { payload }) => {
      const newTransactions = state.transactions.filter(
        (transaction) => transaction.id !== payload
      );
      state.transactions = newTransactions;
      const spentValues = calcSpentAmount(state.transactions);
      state.spentAmount = spentValues;
      state.isTransactionsLoading = false;
    },
    [updateTransaction.fulfilled]: (state, { payload }) => {
      const { id } = payload;
      const newTransactions = state.transactions.filter(
        (transaction) => transaction.id !== id
      );
      newTransactions.push(payload);
      state.transactions = newTransactions;
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
    [deleteTransaction.rejected]: (state, { payload }) => {
      state.transactionsErrorMessage = payload;
      state.isTransactionsLoading = false;
    },
    [updateTransaction.rejected]: (state, { payload }) => {
      state.transactionsErrorMessage = payload;
      state.isTransactionsLoading = false;
    },
  },
});

export const { setSelectedDates } = transactionsSlice.actions;

export default transactionsSlice.reducer;
