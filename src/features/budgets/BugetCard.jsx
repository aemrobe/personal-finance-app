import Button from "../../ui/Button";
import { CaretRightIcon } from "../../ui/Icons";
import Menus from "../../ui/Menus";
import ProgressBar from "../../ui/ProgressBar";
import { formatCurrency, formatDate } from "../../utils/helpers";

function BudgetCard({ budget }) {
  const { id, category, maximum, theme } = budget;

  return (
    <div className="border-2 border-red-500 rounded-xl pt-6 px-5 bg-surface-primary">
      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-4  border-2 border-red-500">
          <span className="w-4 h-4 bg-green-500 inline-block rounded-full"></span>
          <h2 className="text-preset-2 text-content-main capitalize">
            Entertainment
          </h2>
        </div>

        <Menus.Toggle id={id} name={category} />

        <Menus.List id={id}>
          <Menus.Button color={"text-contain-main"}>Edit Budget</Menus.Button>

          <Menus.Button color={"text-content-error"}>
            Delete Budget
          </Menus.Button>
        </Menus.List>
      </div>

      <p className="text-preset-4 text-content-secondary mb-4">
        Maximum of {formatCurrency(maximum)}
      </p>

      <ProgressBar
        percentage={50}
        themeColor={"#277C78"}
        containerClass={"h-8 mb-4 p-1"}
      />

      <div className="flex mb-5">
        <BudgetStat title={"Spent"} value={25} bgColor={theme} />
        <BudgetStat title={"Remaining"} value={50} />
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

        <ul>
          <li className={"flex items-center justify-between"}>
            <h4 className="text-preset-5-bold text-content-main">
              Charlie Electric Company
            </h4>

            <div className="flex flex-col space-y-1">
              <p className="text-preset-5-bold text-content-main">
                -{formatCurrency(100)}
              </p>
              <p className="text-preset-5 text-content-secondary">
                {formatDate("2024-08-19T14:23:11Z")}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
