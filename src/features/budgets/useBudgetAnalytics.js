import { useMemo } from "react";
import { useBudgets } from "./useBudgets";
import { useAllTransactions } from "../transactions/useAllTransactions";
import { filterSpendingTransactionForCategory } from "../../utils/helpers";
import { AUGUSTMONTH, YEAR2024 } from "../../utils/constants";

export function useBudgetAnayltics() {
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: transactionError,
    isFetching: isFetchingTransactions,
    refetch: refetchTransactions,
  } = useAllTransactions();

  const {
    data: budgets,
    isLoading: isLoadingBudgets,
    error: budgetError,
    isFetching: isFetchingBudgets,
    refetch: refetchBudgets,
  } = useBudgets();

  const isLoadingAnalytics = isLoadingTransactions || isLoadingBudgets;
  const isFetchingAnalytics = isFetchingTransactions || isFetchingBudgets;
  const errorAnalytics = transactionError?.message || budgetError?.message;

  const refetchAnayltics = () => {
    refetchBudgets();
    refetchTransactions();
  };

  const chartData = useMemo(
    () =>
      budgets?.map((budget) => {
        const {
          categories: { category: budgetCategory },
          theme,
          maximum,
          id,
        } = budget;

        const totalSpent = Math.abs(
          filterSpendingTransactionForCategory(transactions, budgetCategory)
            ?.filter((transaction) => {
              const { date } = transaction;

              const transactionDate = new Date(date);

              return (
                transactionDate.getMonth() === AUGUSTMONTH &&
                transactionDate.getFullYear() === YEAR2024
              );
            })
            .reduce((sum, cur) => sum + cur.amount, 0),
        );

        const remainingAmount = Math.max(maximum - totalSpent, 0);
        const percentageOfSpent = Math.min((totalSpent / maximum) * 100, 100);

        const latestTransactions = [
          ...(filterSpendingTransactionForCategory(
            transactions,
            budgetCategory,
          ) || []),
        ]
          ?.sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        return {
          name: budgetCategory,
          value: totalSpent,
          fill: theme,
          id,
          maximum,
          remainingAmount,
          percentageOfSpent,
          latestTransactions,
        };
      }),
    [budgets, transactions],
  );

  const totalSpentForAllCategories = chartData?.reduce(
    (sum, cur) => sum + cur.value,
    0,
  );

  const totalMaximumForAllCategories = chartData?.reduce(
    (sum, cur) => sum + cur.maximum,
    0,
  );

  return {
    budgets,
    transactions,
    chartData,
    totalSpentForAllCategories,
    totalMaximumForAllCategories,
    isLoadingAnalytics,
    isFetchingAnalytics,
    errorAnalytics,
    refetchAnayltics,
  };
}
