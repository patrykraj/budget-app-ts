function prepareNewTransaction(transaction, categories) {
  transaction.category = {
    id: transaction.categoryId,
    name: categories.find((category) => category.id === transaction.categoryId)
      .name,
    parentCategoryId: categories.find(
      (category) => category.id === transaction.categoryId
    ).parentCategoryId,
  };

  return transaction;
}

export default prepareNewTransaction;
