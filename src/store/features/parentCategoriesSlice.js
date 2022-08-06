import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../client";
import { userId } from "../../static/constants";

export const getAllCategories = createAsyncThunk(
  "allCategories/getAllCategories",
  () => {
    return client
      .get(
        `budgetCategories?_expand=category&_expand=parentCategory&budgetId=${userId}`
      )
      .then((res) => res.json())
      .catch((err) => err.message);
  }
);

export const allCategoriesSlice = createSlice({
  name: "allCategories",
  initialState: {
    allCategories: [],
    parentCategories: [],
    budgetedCategories: {},
    isCategoriesLoading: false,
    errorMessage: null,
  },
  reducers: {
    setBudgetedCategories: (state, { payload }) => {
      state.budgetedCategories = payload;
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.isLoading = true;
      if (state.errorMessage) state.errorMessage = null;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      const parentCategories = payload.reduce((acc, { parentCategory }) => {
        return [...acc, parentCategory];
      }, []);
      const uniqueParentCategories = [
        ...new Map(parentCategories.map((item) => [item.id, item])).values(),
      ];

      const budgetedCategoriesTemp = { total: 0 };
      for (let i = 0; i < payload.length; i++) {
        if (
          // eslint-disable-next-line no-prototype-builtins
          budgetedCategoriesTemp.hasOwnProperty(payload[i].parentCategoryId)
        ) {
          budgetedCategoriesTemp[payload[i].parentCategoryId] +=
            payload[i].budget;
        } else {
          budgetedCategoriesTemp[payload[i].parentCategoryId] =
            payload[i].budget;
        }
        budgetedCategoriesTemp.total += payload[i].budget;
      }

      state.allCategories = payload;
      state.budgetedCategories = { ...budgetedCategoriesTemp };
      state.parentCategories = uniqueParentCategories;
      state.isLoading = false;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default allCategoriesSlice.reducer;
