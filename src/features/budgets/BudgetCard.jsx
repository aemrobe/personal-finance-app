import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal";
import { CaretRightIcon } from "../../ui/Icons";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ProgressBar from "../../ui/ProgressBar";
import { formatCurrency, formatDate } from "../../utils/helpers";
import BudgetForm from "./BudgetForm";
import { useDeleteBudget } from "./useDeleteBudget";

function BudgetCard({ budget }) {
  const { deleteBudget, isDeletingBudget } = useDeleteBudget();
  const navigate = useNavigate();

  const {
    id,
    name,
    maximum,
    fill,
    percentageOfSpent,
    value: totalSpent,
    remainingAmount,
    latestTransactions,
  } = budget;

  return (
    <div className="rounded-xl py-6 px-5 bg-surface-primary ">
      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-4">
          <span
            style={{
              backgroundColor: fill,
            }}
            className="w-4 h-4 inline-block rounded-full"
          ></span>
          <h3 className="text-preset-2 text-content-main capitalize">{name}</h3>
        </div>

        <Menus.Toggle id={id} name={name} />

        <Menus.List id={id}>
          <Modal.Open
            modalName={`edit-budget-${id}`}
            returnToSelector={`#menu-trigger-${id}`}
          >
            <Menus.Button color={"text-contain-main"}>Edit Budget</Menus.Button>
          </Modal.Open>

          <Modal.Open
            modalName={`delete-budget-${id}`}
            returnToSelector={`#menu-trigger-${id}`}
          >
            <Menus.Button color={"text-content-error"}>
              Delete Budget
            </Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window
          titleId={`edit-budget-title-${id}`}
          contentId={`edit-budget-desc-${id}`}
          modalName={`edit-budget-${id}`}
        >
          <BudgetForm
            budgetModalType={`edit-budget-${id}`}
            budgetToEdit={budget}
          />
        </Modal.Window>

        <Modal.Window
          titleId={`delete-budget-title-${id}`}
          contentId={`delete-budget-desc-${id}`}
          modalName={`delete-budget-${id}`}
        >
          <ConfirmDeleteModal
            titleId={`delete-budget-title-${id}`}
            contentId={`delete-budget-desc-${id}`}
            title={name}
            content={
              "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
            }
            onConfirm={(closeModal) => {
              deleteBudget(id, {
                onSuccess: () => {
                  closeModal();
                },
              });
            }}
            isDeleting={isDeletingBudget}
          />
        </Modal.Window>
      </div>

      <p className="text-preset-4 text-content-secondary mb-4">
        Maximum of {formatCurrency(maximum)}
      </p>

      <ProgressBar
        percentage={percentageOfSpent}
        themeColor={fill}
        containerClass={"h-8 mb-4 p-1"}
      />

      <div className="flex mb-5">
        <BudgetStat title={"Spent"} value={totalSpent} bgColor={fill} />
        <BudgetStat title={"Remaining"} value={remainingAmount} />
      </div>

      <div className="bg-surface-secondary p-4 rounded-xl">
        <div className="flex justify-between mb-5">
          <h3 className="capitalize text-preset-3 text-content-main">
            Latest Spending
          </h3>

          <Button
            isActionButton={false}
            variant="tertiary"
            icon={<CaretRightIcon />}
            onClick={() => {
              navigate(`/transactions?category=${encodeURIComponent(name)}`);
            }}
          >
            See All
          </Button>
        </div>

        <ul className="divide-y divide-border-divider/15">
          {latestTransactions?.map((transaction) => (
            <BudgetTransactionItem
              key={transaction.id}
              name={transaction.name}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function BudgetTransactionItem({ name, amount, date }) {
  return (
    <li
      className={"flex items-center justify-between py-3 first:pt-0 last:pb-0"}
    >
      <p className="text-preset-5-bold text-content-main">{name}</p>

      <div className="flex flex-col space-y-1 items-end">
        <p className="text-preset-5-bold text-content-main">
          {formatCurrency(amount)}
        </p>
        <p className="text-preset-5 text-content-secondary">
          {formatDate(date)}
        </p>
      </div>
    </li>
  );
}

function BudgetStat({ title, value, bgColor = "" }) {
  return (
    <div className="relative stat-tag flex-auto pl-4">
      <div
        style={{
          backgroundColor: `${bgColor ? bgColor : ""}`,
        }}
        className={`absolute left-0 w-1 h-full rounded-lg ${!bgColor ? "bg-surface-secondary" : ""}`}
      ></div>

      <p className="text-preset-5 text-content-secondary mb-1">{title}</p>
      <p className="text-preset-4-bold text-content-main">
        {" "}
        {formatCurrency(value)}
      </p>
    </div>
  );
}

export default BudgetCard;
