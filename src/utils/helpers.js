export const formatCurrency = (value, showDecimals = true) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (dateString) => {
  const newDate = new Date(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(newDate);
};

export const findAvailableTheme = (budgets, THEMES) => {
  return THEMES.find(
    (theme) =>
      !budgets.some(
        (budget) => budget.theme.toLowerCase() === theme.color.toLowerCase(),
      ),
  )?.color;
};

export const filterSpendingTransactionForCategory = (
  transactions,
  budgetCategory,
) => {
  return transactions?.filter((transaction) => {
    const {
      categories: { category: transactionCategory },
      amount,
    } = transaction;

    return (
      transactionCategory.toLowerCase() === budgetCategory.toLowerCase() &&
      amount < 0
    );
  });
};
