import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PageHeader from "../../ui/PageHeader";
import PageTitle from "../../ui/PageTitle";
import BudgetForm from "./BudgetForm";

function BudgetHeader() {
  return (
    <Modal>
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
    </Modal>
  );
}

export default BudgetHeader;
