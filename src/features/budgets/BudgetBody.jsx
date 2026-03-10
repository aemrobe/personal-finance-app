import Menus from "../../ui/Menus";
import SpinnerContainer from "../../ui/SpinnerContainer";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "./useBudgets";

function BudgetBody() {
  const { data: budgets, isLoading } = useBudgets();

  if (isLoading) return <SpinnerContainer />;

  return (
    <Menus>
      <div className="flex flex-col gap-6">
        {budgets
          .filter((budget) => budget.maximum)
          .map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
      </div>
    </Menus>
  );
}

export default BudgetBody;
