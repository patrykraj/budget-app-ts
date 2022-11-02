const formatCurrency = (val) => {
  let number = Number(val);
  if (Number.isNaN(number)) number = 0;

  return new Intl.NumberFormat("pl", {
    style: "currency",
    currency: "PLN",
  }).format(number);
};

export default formatCurrency;
