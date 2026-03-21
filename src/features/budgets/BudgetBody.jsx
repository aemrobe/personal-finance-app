import EmptyMessage from "../../ui/EmptyMessage";
import ErrorDisplay from "../../ui/ErrorDisplay";
import ErrorWrapper from "../../ui/ErrorWrapper";
import Menus from "../../ui/Menus";
import SpinnerContainer from "../../ui/SpinnerContainer";
import { useCategories } from "../categories/useCategory";
import BudgetCard from "./BudgetCard";
import BudgetForm from "./BudgetForm";
import { useBudgets } from "./useBudgets";

function BudgetBody() {
  const {
    data: budgets,
    isLoading: isLoadingBudgets,
    error: budgetError,
    isFetching: isFetchingBudgets,
    refetch: refetchBudgets,
  } = useBudgets();

  const {
    isLoading: isLoadingCategories,
    error: categoriesError,
    isFetching: isFetchingCategories,
    refetch: refetchCategories,
  } = useCategories();

  if (isLoadingBudgets || isLoadingCategories) return <SpinnerContainer />;

  if (budgetError || categoriesError)
    return (
      <ErrorWrapper>
        <ErrorDisplay
          error={budgetError.message || categoriesError.message}
          isLoading={isFetchingBudgets || isFetchingCategories}
          onRetry={() => {
            refetchBudgets();
            refetchCategories();
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
    <Menus>
      <div className="flex flex-col gap-6">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={{ ...budget, category: budget.categories?.category }}
          />
        ))}
      </div>
    </Menus>
  );
}

export default BudgetBody;
