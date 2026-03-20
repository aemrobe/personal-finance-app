import Button from "../../ui/Button";
import PageHeader from "../../ui/PageHeader";
import PageTitle from "../../ui/PageTitle";
import BudgetForm from "./BudgetForm";

import Modal from "../../ui/Modal";

function BudgetHeader() {
  return (
    <PageHeader>
      <PageTitle title={"Budgets"} />
      <Modal.Open modalName={"add-budget"}>
        <Button
          onClick={(e) => e.stopPropagation()}
          isActionButton={true}
          variant={"primary"}
        >
          + Add New Budget
        </Button>
      </Modal.Open>

      <Modal.Window
        titleId={"add-budget-title"}
        contentId={"add-budget-content"}
        potId={"budget"}
        modalName={"add-budget"}
      >
        <BudgetForm budgetModalType={`add-budget`} />
      </Modal.Window>
    </PageHeader>
  );
}

export default BudgetHeader;
