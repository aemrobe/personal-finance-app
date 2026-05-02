import {
  NavBudgetIcon,
  NavOverviewIcon,
  NavPotsIcon,
  NavRecurringBillsIcon,
  NavTransactionIcon,
} from "./Icons";
import LargeLogoIcon from "./Icons/LargeLogoIcon";
import NavButton from "./NavButton";

function SideNav() {
  return (
    <nav
      className="w-[inherit] fixed
     h-full hidden lg:block  lg:py-10  bg-surface-inverse lg:rounded-tr-2xl "
    >
      <div className="lg:mb-16 lg:px-4 xl:px-6 2xl:px-8">
        <LargeLogoIcon className={"w-30.5 text-content-inverse"} />
      </div>

      <ul className=" lg:flex lg:flex-col lg:pr-4 xl:pr-5 2xl:pr-6 lg:gap-1">
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

export default SideNav;
