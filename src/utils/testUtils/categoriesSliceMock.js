export const allCategoriesMock = [
  {
    id: 1,
    name: "Internet",
    parentCategoryId: 2,
    parentCategory: {
      id: 2,
      name: "Rachunki i media",
      noExtend: false,
    },
    budget: 120,
  },
  {
    id: 2,
    name: "Komórka",
    parentCategoryId: 2,
    parentCategory: {
      id: 2,
      name: "Rachunki i media",
      noExtend: false,
    },
    budget: 40,
  },
  {
    id: 3,
    name: "Czynsz i wynajem",
    parentCategoryId: 2,
    parentCategory: {
      id: 2,
      name: "Rachunki i media",
      noExtend: false,
    },
    budget: 1200,
  },
  {
    id: 4,
    name: "Alkohol",
    parentCategoryId: 1,
    parentCategory: {
      id: 1,
      name: "Zakupy",
      noExtend: false,
    },
    budget: 30,
  },
  {
    id: 5,
    name: "Spozywcze",
    parentCategoryId: 1,
    parentCategory: {
      id: 1,
      name: "Zakupy",
      noExtend: false,
    },
    budget: 500,
  },
  {
    id: 6,
    name: "Chemia",
    parentCategoryId: 1,
    parentCategory: {
      id: 1,
      name: "Zakupy",
      noExtend: false,
    },
    budget: 400,
  },
  {
    id: 7,
    name: "Inne",
    parentCategoryId: 3,
    parentCategory: {
      id: 3,
      name: "Inne",
      noExtend: true,
    },
    budget: 80,
  },
];

export const parentCategoriesMock = [
  {
    id: 2,
    name: "Rachunki i media",
    noExtend: false,
  },
  {
    id: 1,
    name: "Zakupy",
    noExtend: false,
  },
  {
    id: 3,
    name: "Inne",
    noExtend: true,
  },
];
