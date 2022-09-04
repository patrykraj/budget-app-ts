const transactionsMock = [
  {
    id: 1,
    description: "Dostawca internetu",
    amount: 120.47,
    categoryId: 1,
    date: "2022-08-15T20:39:41.768Z",
    budgetId: 1,
    category: {
      parentCategoryId: 1,
      name: "name",
    },
  },
  {
    id: 2,
    description: "Dostawca sieci komórkowej",
    amount: 39.99,
    categoryId: 2,
    date: "2022-08-10T13:33:21.768Z",
    budgetId: 1,
    category: {
      parentCategoryId: 2,
      name: "name",
    },
  },
  {
    id: 3,
    description: "Cotygodniowe zakupy",
    amount: 23.88,
    categoryId: 5,
    date: "2022-07-31T05:41:01.000Z",
    budgetId: 1,
    category: {
      parentCategoryId: 3,
      name: "name",
    },
  },
  {
    id: 4,
    description: "Straty spowodowane głupotą",
    amount: 123.88,
    categoryId: 7,
    date: "2022-08-17T15:41:01.768Z",
    budgetId: 1,
    category: {
      parentCategoryId: 1,
      name: "name",
    },
  },
  {
    id: 5,
    description: "Cotygodniowe zakupy",
    amount: 92.38,
    categoryId: 6,
    date: "2022-08-17T15:41:01.768Z",
    budgetId: 1,
    category: {
      parentCategoryId: 2,
      name: "name",
    },
  },
];

export default transactionsMock;
