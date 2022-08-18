export function getDate(selectedTransaction, update) {
  if (selectedTransaction && update) return new Date(selectedTransaction.date);
  return new Date();
}

export function getMaxDate() {
  return new Date(new Date() + 1);
}
