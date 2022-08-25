import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../client";
import { userId } from "../../static/constants";
import { validateResponse } from "../../utils";

const initialState = {
  allCategories: [],
  parentCategories: [],
  budgetedParentCategories: {},
  isCategoriesLoading: true,
  categoriesErrorMessage: null,
};

export const getAllCategories = createAsyncThunk(
  "allCategories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const [categories, budget] = await Promise.all([
        client
          .get("categories?_expand=parentCategory")
          .then((res) => validateResponse(res)),
        client.get(`budgets/${userId}`).then((res) => validateResponse(res)),
      ]);
      return { categories, budget };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const allCategoriesSlice = createSlice({
  name: "allCategories",
  initialState,
  reducers: {
    setBudgetedCategories: (state, { payload }) => {
      state.budgetedParentCategories = payload;
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.isCategoriesLoading = true;
      if (state.categoriesErrorMessage) state.categoriesErrorMessage = null;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      const { categories, budget } = payload;
      const parentCategories = categories.reduce((acc, { parentCategory }) => {
        return [...acc, parentCategory];
      }, []);
      const uniqueParentCategories = [
        ...new Map(parentCategories.map((item) => [item.id, item])).values(),
      ];

      const categoriesWithBudget = categories.map((category) => ({
        ...category,
        budget: budget.categories.find(
          (budgetCategory) => budgetCategory.categoryId === category.id
        ).budget,
      }));

      const budgetedCategoriesTemp = { total: 0 };
      for (let i = 0; i < budget.categories.length; i++) {
        if (
          // eslint-disable-next-line no-prototype-builtins
          budgetedCategoriesTemp.hasOwnProperty(
            budget.categories[i].parentCategoryId
          )
        ) {
          budgetedCategoriesTemp[budget.categories[i].parentCategoryId] +=
            budget.categories[i].budget;
        } else {
          budgetedCategoriesTemp[budget.categories[i].parentCategoryId] =
            budget.categories[i].budget;
        }
        budgetedCategoriesTemp.total += budget.categories[i].budget;
      }

      state.allCategories = categoriesWithBudget;
      state.budgetedParentCategories = { ...budgetedCategoriesTemp };
      state.parentCategories = uniqueParentCategories;
      state.isCategoriesLoading = false;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.categoriesErrorMessage = action.payload;
      state.isCategoriesLoading = false;
    },
  },
});

export default allCategoriesSlice.reducer;
