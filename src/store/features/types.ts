export type TransactionType = {
  id: number;
  description: string;
  amount: number;
  categoryId: number;
  date: string;
  budgetId: number;
};

export type SliceState = {
  transactions: TransactionType[];
  spentAmount: any;
  isTransactionsLoading: boolean;
  transactionsErrorMessage: string | null;
  selectedDates: any;
};
