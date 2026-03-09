import Menus from "../../ui/Menus";
import BugetCard from "./BugetCard";
import { useBudgets } from "./useBudgets";

function BudgetBody() {
  const { data: budgets, isLoading } = useBudgets();

  return (
    <Menus>
      <div className="flex flex-col gap-6">
        <BugetCard
          budget={{
            id: 15,
            category: "Entertainment",
            maximum: 50,
            theme: "green",
          }}
        />
      </div>
    </Menus>
  );
}

export default BudgetBody;
