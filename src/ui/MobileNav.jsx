import NavButton from "./NavButton";
import {
  NavBudgetIcon,
  NavOverviewIcon,
  NavPotsIcon,
  NavRecurringBillsIcon,
  NavTransactionIcon,
} from "./Icons";

function MobileNav() {
  const colorValues = {
    navIconColor:
      "text-nav-icon-default hover:text-nav-icon-hover transition-colors duration-200",
  };

  return (
    <nav className="bg-surface-inverse rounded-t-lg absolute inset-x-0 bottom-0 pt-2 px-4">
      <ul className="flex justify-center">
        <NavButton path={"/overview"}>
          <NavOverviewIcon className={colorValues["navIconColor"]} />
        </NavButton>

        <NavButton path={"/transactions"}>
          <NavTransactionIcon className={colorValues["navIconColor"]} />
        </NavButton>

        <NavButton path={"/budgets"}>
          <NavBudgetIcon className={colorValues["navIconColor"]} />
        </NavButton>

        <NavButton path={"/pots"}>
          <NavPotsIcon className={colorValues["navIconColor"]} />
        </NavButton>

        <NavButton path={"/recurring-bills"}>
          <NavRecurringBillsIcon className={colorValues["navIconColor"]} />
        </NavButton>
      </ul>
    </nav>
  );
}

export default MobileNav;
