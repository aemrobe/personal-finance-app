import EmptyMessage from "../../ui/EmptyMessage";
import ErrorDisplay from "../../ui/ErrorDisplay";
import ErrorWrapper from "../../ui/ErrorWrapper";
import Menus from "../../ui/Menus";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useCategories } from "../categories/useCategory";
import BudgetCard from "./BudgetCard";
import BudgetForm from "./BudgetForm";
import { formatCurrency } from "../../utils/helpers";

import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import PieChartFigure from "../../ui/PieChartFigure";
import { useBudgetAnayltics } from "./useBudgetAnalytics";

function BudgetBody() {
  const {
    budgets,
    chartData,
    totalSpentForAllCategories,
    totalMaximumForAllCategories,
    isLoadingAnalytics,
    isFetchingAnalytics,
    errorAnalytics,
    refetchAnayltics,
  } = useBudgetAnayltics();

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

  const isLoading = isLoadingUser || isLoadingCategories || isLoadingAnalytics;

  if (userError || errorAnalytics || categoriesError)
    return (
      <ErrorWrapper>
        <ErrorDisplay
          error={
            userError?.message || categoriesError?.message || errorAnalytics
          }
          isLoading={
            isFetchingUser || isFetchingAnalytics || isFetchingCategories
          }
          onRetry={() => {
            refetchAnayltics();
            refetchCategories();
            refetchUser();
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
    <div className="flex-1 flex flex-col gap-6 relative max-w-172 mx-auto w-full">
      {isLoading ? (
        <SpinnerMiniContainer size="text-5xl" />
      ) : (
        <>
          <div className="bg-surface-primary pt-6 pb-4 md:py-8 px-5 md:px-8  rounded-xl flex md:grid  grid-cols-2 md:gap-8 md:items-center">
            <PieChartFigure
              className={"mb-8 md:mb-0"}
              totalSpent={totalSpentForAllCategories}
              totalMaximum={totalMaximumForAllCategories}
              chartData={chartData}
              heightOfContainer={"h-70"}
              innerRadius={85}
              outerRadius={120}
            />

            <div className="overflow-y-auto no-scrollbar  max-h-72 ">
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
        </>
      )}
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
