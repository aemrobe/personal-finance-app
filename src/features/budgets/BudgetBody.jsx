import Menus from "../../ui/Menus";
import SpinnerContainer from "../../ui/SpinnerContainer";
import { useCategories } from "../categories/useCategory";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "./useBudgets";

function BudgetBody() {
  const { data: budgets, isLoading } = useBudgets();
  const { isLoading: isLoadingCategories } = useCategories();

  if (isLoading || isLoadingCategories) return <SpinnerContainer />;

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
