import { transactionStrings } from "../static/constants";

function sortTransactions(arr, { value, asc }) {
  if (arr.length < 2) return arr;

  const { dateHeader, amountHeader, categoryHeader } =
    transactionStrings.transactionsHeaders;

  if (value === dateHeader.value) {
    arr = arr.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      if (aTime < bTime) return 1;
      if (aTime > bTime) return -1;
      return 0;
    });
  } else if (value === amountHeader.value) {
    arr = arr.sort((a, b) => b[value] - a[value]);
  } else if (value === categoryHeader.value) {
    arr = arr.sort((a, b) => {
      const aString = a[value].name.toUpperCase();
      const bString = b[value].name.toUpperCase();
      if (aString < bString) return -1;
      if (aString > bString) return 1;
      return 0;
    });
  } else {
    arr = arr.sort((a, b) => {
      const aString = a[value].toUpperCase();
      const bString = b[value].toUpperCase();
      if (aString < bString) return -1;
      if (aString > bString) return 1;
      return 0;
    });
  }

  if (!asc[value]) return arr.reverse();
  return arr;
}

export default sortTransactions;
