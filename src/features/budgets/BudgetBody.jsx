import { useMemo } from "react";
import EmptyMessage from "../../ui/EmptyMessage";
import ErrorDisplay from "../../ui/ErrorDisplay";
import ErrorWrapper from "../../ui/ErrorWrapper";
import Menus from "../../ui/Menus";
import SpinnerContainer from "../../ui/SpinnerContainer";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useCategories } from "../categories/useCategory";
import { useTransactions } from "../transactions/useTransactions";
import BudgetCard from "./BudgetCard";
import BudgetForm from "./BudgetForm";
import { useBudgets } from "./useBudgets";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  filterSpendingTransactionForCategory,
  formatCurrency,
} from "../../utils/helpers";
import { AUGUSTMONTH, YEAR2024 } from "../../utils/constants";

function BudgetBody() {
  const EMPTY_CHART_DATA = [
    {
      value: 1,
      fill: `var(--color-empty-chart)`,
    },
  ];

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: transactionError,
    isFetching: isFetchingTransactions,
    refetch: refetchTransactions,
  } = useTransactions();

  const {
    data: budgets,
    isLoading: isLoadingBudgets,
    error: budgetError,
    isFetching: isFetchingBudgets,
    refetch: refetchBudgets,
  } = useBudgets();

  const {
    isLoading: isLoadingUser,
    error: userError,
    isFetching: isFetchingUser,
    refetch: refetchUser,
  } = useCurrentUser();

  const {
    isLoading: isLoadingCategories,
    error: categoriesError,
    isFetching: isFetchingCategories,
    refetch: refetchCategories,
  } = useCategories();

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

  if (
    isLoadingUser ||
    isLoadingBudgets ||
    isLoadingCategories ||
    isLoadingTransactions
  )
    return <SpinnerContainer />;

  if (userError || budgetError || transactionError || categoriesError)
    return (
      <ErrorWrapper>
        <ErrorDisplay
          error={
            userError?.message ||
            budgetError?.message ||
            categoriesError?.message ||
            transactionError?.message
          }
          isLoading={
            isFetchingUser ||
            isFetchingTransactions ||
            isFetchingBudgets ||
            isFetchingCategories
          }
          onRetry={() => {
            refetchBudgets();
            refetchCategories();
            refetchUser();
            refetchTransactions();
          }}
        />
      </ErrorWrapper>
    );

  if (budgets?.length === 0)
    return (
      <EmptyMessage
        title={"No budgets created"}
        text={
          "It looks like you don't have any budgets setup. Create a budget to keep your spending on track."
        }
        icon={"💰"}
        action={BudgetForm}
        actionText={"+ Add New Budget"}
        modalName={"add-budget"}
        titleId={"add-budget-title"}
        returnToSelector={"budgets-title-id"}
        contentId={"add-budget-content"}
      />
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface-primary pt-6 px-5 pb-4 rounded-xl">
        <div
          className="relative h-70 w-full mb-8"
          aria-hidden="true"
          style={{ pointerEvents: "none" }}
        >
          <div className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center z-20">
            <span className="text-preset-1 text-content-main">
              {formatCurrency(totalSpentForAllCategories, false)}
            </span>
            <span className="text-preset-5 text-content-secondary mt-2">
              of {formatCurrency(totalMaximumForAllCategories, false)} limit
            </span>
          </div>

          <ResponsiveContainer height="100%" width="100%">
            <PieChart
              role="presentation"
              aria-hidden="true"
              accessibilityLayer={false}
              focusable={false}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              style={{
                pointerEvents: "none",
                touchAction: "none",
                outline: "none",
              }}
            >
              <Pie
                tabIndex="-1"
                aria-hidden="true"
                role="presentation"
                data={
                  totalSpentForAllCategories === 0
                    ? EMPTY_CHART_DATA
                    : chartData?.filter((budget) => budget.value > 0)
                }
                nameKey={"name"}
                dataKey={"value"}
                innerRadius={85}
                outerRadius={120}
                cx={"50%"}
                cy={"50%"}
                stroke={"none"}
                label={false}
                labelLine={false}
                isAnimationActive={totalSpentForAllCategories !== 0}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <span className="sr-only">Spending distribution overview</span>

          <h2 className="text-preset-2 text-content-main mb-6">
            Spending Summary
          </h2>

          <ul className="divide-y divide-border-subtle">
            {chartData.map((budget) => (
              <SpendingSummaryItem key={budget.id} budget={budget} />
            ))}
          </ul>
        </div>
      </div>

      <Menus>
        <div className="flex flex-col gap-6">
          {chartData?.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      </Menus>
    </div>
  );
}

function SpendingSummaryItem({ budget }) {
  const { fill, name, value: totalSpent, maximum } = budget;

  return (
    <li className="flex items-center py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-4">
        <span
          style={{
            backgroundColor: fill,
          }}
          className="w-1 h-5.25 inline-block rounded-lg"
        />
        <span className="text-preset-4 text-content-secondary">{name}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-preset-3">{formatCurrency(totalSpent)}</span>
        <span className="text-preset-5 text-content-secondary">
          {" "}
          of {formatCurrency(maximum)}
        </span>
      </div>
    </li>
  );
}
export default BudgetBody;
