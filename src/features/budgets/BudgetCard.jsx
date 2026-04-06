import Button from "../../ui/Button";
import { CaretRightIcon } from "../../ui/Icons";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ProgressBar from "../../ui/ProgressBar";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { useTransactions } from "../transactions/useTransactions";
import BudgetForm from "./BudgetForm";

function BudgetCard({ budget }) {
  const { id, category, maximum, theme } = budget;

  const { data: transactions, isLoading } = useTransactions();

  const spendingsForThisCategory = transactions?.filter((transaction) => {
    return (
      transaction.categories.category === category && transaction.amount < 0
    );
  });

  const spendingOfTheMonth = Math.abs(
    spendingsForThisCategory
      ?.filter((transaction) => {
        const transactionDate = new Date(transaction.date);

        return (
          transactionDate.getMonth() === 7 &&
          transactionDate.getFullYear() === 2024
        );
      })
      .reduce((acc, cur) => cur.amount + acc, 0),
  );

  const percentageSpendingOftheMonth = Math.min(
    (spendingOfTheMonth / maximum) * 100,
    100,
  );

  const remainingAmount = Math.max(maximum - spendingOfTheMonth, 0);

  const latestSpendings = [...(spendingsForThisCategory || [])]
    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="rounded-xl py-6 px-5 bg-surface-primary relative">
      {isLoading && (
        <SpinnerMiniContainer
          backgroundColor="bg-surface-primary"
          size={"text-3xl"}
        />
      )}

      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-4">
          <span
            style={{
              backgroundColor: theme,
            }}
            className="w-4 h-4 inline-block rounded-full"
          ></span>
          <h2 className="text-preset-2 text-content-main capitalize">
            {category}
          </h2>
        </div>

        <Menus.Toggle id={id} name={category} />

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
      </div>

      <p className="text-preset-4 text-content-secondary mb-4">
        Maximum of {formatCurrency(maximum)}
      </p>

      <ProgressBar
        percentage={percentageSpendingOftheMonth}
        themeColor={theme}
        containerClass={"h-8 mb-4 p-1"}
      />

      <div className="flex mb-5">
        <BudgetStat
          title={"Spent"}
          value={spendingOfTheMonth}
          bgColor={theme}
        />
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
          >
            See All
          </Button>
        </div>

        <ul className="divide-y divide-border-divider/15">
          {latestSpendings?.map((transaction) => (
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
      <h4 className="text-preset-5-bold text-content-main">{name}</h4>

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
