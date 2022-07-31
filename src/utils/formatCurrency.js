const formatCurrency = (val) => {
  const number = Number(val);

  return new Intl.NumberFormat("pl", {
    style: "currency",
    currency: "PLN",
  }).format(number);
};

export default formatCurrency;
