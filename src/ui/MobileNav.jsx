import NavButton from "./NavButton";
import {
  NavBudgetIcon,
  NavOverviewIcon,
  NavPotsIcon,
  NavRecurringBillsIcon,
  NavTransactionIcon,
} from "./Icons";

function MobileNav() {
  return (
    <nav className="z-30 bg-surface-inverse rounded-t-lg fixed inset-x-0 bottom-0 pt-2 px-4 md:px-10">
      <ul className="flex md:gap-10.5 justify-center">
        <NavButton navText={"Overview"} path={"/overview"}>
          <NavOverviewIcon />
        </NavButton>

        <NavButton navText={"Transactions"} path={"/transactions"}>
          <NavTransactionIcon />
        </NavButton>

        <NavButton navText={"Budgets"} path={"/budgets"}>
          <NavBudgetIcon />
        </NavButton>

        <NavButton navText={"Pots"} path={"/pots"}>
          <NavPotsIcon classNameIcon={"w-4.5 h-5.5"} />
        </NavButton>

        <NavButton navText={"Recurring Bills"} path={"/recurring-bills"}>
          <NavRecurringBillsIcon />
        </NavButton>
      </ul>
    </nav>
  );
}

export default MobileNav;
