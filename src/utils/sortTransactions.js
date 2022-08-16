function sortTransactions(arr, sortBy) {
  if (sortBy === "date") {
    arr = arr.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      if (aTime < bTime) return 1;
      if (aTime > bTime) return -1;
      return 0;
    });
  } else if (sortBy === "amount") {
    arr = arr.sort((a, b) => b[sortBy] - a[sortBy]);
  } else {
    arr = arr.sort((a, b) => {
      const aString = a[sortBy].toUpperCase();
      const bString = b[sortBy].toUpperCase();
      if (aString < bString) return -1;
      if (aString > bString) return 1;
      return 0;
    });
  }

  return arr;
}

export default sortTransactions;
