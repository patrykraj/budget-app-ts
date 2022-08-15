function calcSpentAmount(arr) {
  return arr.reduce(
    (acc, transaction) => {
      acc.parentCategories.totalSpent += transaction.amount;
      if (
        acc[transaction.categoryId] ||
        acc.parentCategories[transaction.category?.parentCategoryId]
      ) {
        if (acc[transaction.categoryId])
          acc[transaction.categoryId] += transaction.amount;
        else acc[transaction.categoryId] = transaction.amount;
        if (acc.parentCategories[transaction.category.parentCategoryId])
          acc.parentCategories[transaction.category.parentCategoryId] +=
            transaction.amount;
        else
          acc.parentCategories[transaction.category.parentCategoryId] =
            transaction.amount;
        return { ...acc };
      }
      return {
        ...acc,
        [transaction.categoryId]: transaction.amount,
        parentCategories: {
          ...acc.parentCategories,
          [transaction.category.parentCategoryId]: transaction.amount,
        },
      };
    },
    {
      parentCategories: {
        totalSpent: 0,
      },
    }
  );
}

export default calcSpentAmount;
