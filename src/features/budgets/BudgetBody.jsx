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
import { useEffect, useRef, useState } from "react";

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

  const scrollRef = useRef(null);
  const [showShadow, setShowShadow] = useState();

  const isLoading = isLoadingUser || isLoadingCategories || isLoadingAnalytics;

  //showing a shadow when a list overflows.
  useEffect(() => {
    const checkOverflow = function () {
      const el = scrollRef.current;

      if (el) {
        const hasOverflow = el.scrollHeight > el.clientHeight;

        setShowShadow(hasOverflow);
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [chartData]);

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
    <div className="flex-1 flex flex-col gap-6 relative max-w-172 lg:max-w-none mx-auto lg:mx-0 w-full">
      {isLoading ? (
        <SpinnerMiniContainer size="text-5xl" />
      ) : (
        <div className="lg:flex lg:items-start  lg:gap-6">
          <div className="lg:max-w-107 mb-6 bg-surface-primary pt-6 pb-4 md:py-8 px-5 md:px-8  rounded-xl flex flex-col md:grid  md:grid-cols-2 md:gap-8 md:items-center lg:flex-1 lg:flex lg:flex-col lg:items-stretch">
            <PieChartFigure
              className={"mb-8 md:mb-0"}
              totalSpent={totalSpentForAllCategories}
              totalMaximum={totalMaximumForAllCategories}
              chartData={chartData}
              heightOfContainer={"h-70"}
              innerRadius={85}
              outerRadius={120}
            />

            <div className="relative">
              <h2 className="text-preset-2 text-content-main mb-6">
                Spending Summary
              </h2>

              <ul
                ref={scrollRef}
                className="divide-y divide-border-subtle overflow-y-auto no-scrollbar max-h-59"
              >
                {chartData.map((budget) => (
                  <SpendingSummaryItem
                    showShadow={showShadow}
                    key={budget.id}
                    budget={budget}
                  />
                ))}
              </ul>

              <div
                className={`absolute bottom-0 inset-x-0 h-5 pointer-events-none transition-opacity duration-300 bg-linear-to-t from-border-subtle/50 to-transparent ${showShadow ? "opacity-100" : "opacity-0"} `}
              ></div>
            </div>
          </div>

          <Menus>
            <div className="lg:flex-1 flex flex-col gap-6">
              {chartData?.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </div>
          </Menus>
        </div>
      )}
    </div>
  );
}

function SpendingSummaryItem({ budget, showShadow }) {
  const { fill, name, value: totalSpent, maximum } = budget;

  return (
    <li
      className={`flex items-center py-4 first:pt-0 ${showShadow ? "last:pb-4" : "last:pb-0"}`}
    >
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
