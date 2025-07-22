const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};
export default formatCurrency;
