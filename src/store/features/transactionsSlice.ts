import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../client";
import { userId } from "../../static/constants";
import {
  calcSpentAmount,
  prepareNewTransaction,
  prepareDates,
  validatePayloadDate,
  validateResponse,
} from "../../utils";
import { SliceState } from "./types";

const initialState: SliceState = {
  transactions: [],
  spentAmount: {},
  isTransactionsLoading: true,
  transactionsErrorMessage: null,
  selectedDates: {
    ...prepareDates(),
  },
};

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  (_, { getState, rejectWithValue }) => {
    const {
      transactions: { selectedDates },
    } = getState();

    return client
      .get(
        `transactions?date_gte=${selectedDates.startDate}&date_lte=${selectedDates.endDate}&budgetId=${userId}&_expand=category`
      )
      .then((res) => validateResponse(res))
      .catch((err) => rejectWithValue(err.message));
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  (data, { getState, rejectWithValue }) => {
    const {
      parentCategories: { allCategories },
    } = getState();

    return client
      .post(`budgets/${userId}/transactions`, data)
      .then((res) => validateResponse(res))
      .then((resData) => {
        const preparedTransaction = prepareNewTransaction(
          { ...resData },
          allCategories
        );
        return preparedTransaction;
      })
      .catch((err) => rejectWithValue(err.message));
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  (id: number, { rejectWithValue }) => {
    return client
      .delete(`transactions/${id}`)
      .then((res) => validateResponse(res))
      .then(() => id)
      .catch((err) => rejectWithValue(err.message));
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  (transaction, { getState, rejectWithValue }) => {
    const { id } = transaction;
    const {
      parentCategories: { allCategories },
    } = getState();

    return client
      .patch(`transactions/${id}`, transaction)
      .then((res) => validateResponse(res))
      .then((resData) => {
        const preparedTransaction = prepareNewTransaction(
          { ...resData },
          allCategories
        );
        return preparedTransaction;
      })
      .catch((err) => rejectWithValue(err.message));
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
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
      if (validatePayloadDate(payload, state.selectedDates)) {
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

      if (validatePayloadDate(payload, state.selectedDates)) {
        newTransactions.push(payload);
      }

      const spentValues = calcSpentAmount(newTransactions);
      state.spentAmount = spentValues;
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
