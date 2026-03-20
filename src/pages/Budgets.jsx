import BudgetBody from "../features/budgets/BudgetBody";
import BudgetHeader from "../features/budgets/BudgetHeader";
import Modal from "../ui/Modal";

function Budgets() {
  return (
    <Modal>
      <BudgetHeader />
      <BudgetBody />
    </Modal>
  );
}

export default Budgets;
