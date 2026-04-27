import Button from "../../ui/Button";
import { CaretRightIcon, PotIcon } from "../../ui/Icons";
import { formatCurrency } from "../../utils/helpers";
import OverviewBalance from "./OverviewBalance";

function OverviewBody() {
  return (
    <div>
      {/* Balance */}
      <section className="mb-8" aria-label="Account summary">
        <ul className="flex flex-col gap-3">
          <OverviewBalance
            title={"Current Balance"}
            balance={4836}
            backgroundColor="bg-surface-inverse"
            titleColor="text-content-inverse"
            textColor="text-content-inverse"
          />

          <OverviewBalance title={"Income"} balance={3814.25} />

          <OverviewBalance title={"Expenses"} balance={1700.5} />
        </ul>
      </section>

      <section className="bg-surface-primary py-6 px-5 rounded-xl ">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-preset-2 text-content-main ">Pots</h2>

          <Button
            icon={<CaretRightIcon className={"h-2.75"} />}
            disabled=""
            variant={"tertiary"}
          >
            See Details
          </Button>
        </div>

        <div className="bg-surface-app rounded-xl py-5 px-4 flex gap-4 items-center">
          <PotIcon
            className="text-icon-success w-[1.675rem] h-[2.148rem]"
            classNameParent={"size-10"}
          />

          <div>
            <h3 className="text-preset-4 text-content-secondary mb-2.75">
              Total Saved
            </h3>

            <p className="text-preset-1 text-content-main">
              {formatCurrency(850, false)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OverviewBody;
