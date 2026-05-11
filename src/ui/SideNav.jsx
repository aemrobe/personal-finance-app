import { useLogout } from "../features/authentication/useLogout";
import {
  MinimizeMenuIcon,
  NavBudgetIcon,
  NavOverviewIcon,
  NavPotsIcon,
  NavRecurringBillsIcon,
  NavTransactionIcon,
  SignOutIcon,
  SmallLogoIcon,
} from "./Icons";
import LargeLogoIcon from "./Icons/LargeLogoIcon";
import NavButton from "./NavButton";
import SpinnerMiniContainer from "./SpinnerMiniContainer";

function SideNav({ isCollapsed, onToggle, isAnimating }) {
  const transitionClass = isAnimating ? "sidenav-transition" : "";
  const { logout, isLoading } = useLogout();

  return (
    <nav
      aria-label="Primary"
      className={`fixed ${transitionClass} w-[inherit] 
     hidden lg:pt-10 lg:pb-6  bg-surface-inverse lg:rounded-tr-2xl top-0 bottom-0 overflow-y-auto no-scrollbar lg:flex lg:flex-col`}
    >
      <div className="flex-1 flex flex-col max-h-251.25">
        <div
          className={`relative border-2 h-[25.2px] sidenav-transition lg:mb-16 lg:px-4 xl:px-6 2xl:px-8`}
        >
          <div
            className={`absolute ${transitionClass} transform ${isCollapsed ? "ease-out opacity-100" : "ease-in opacity-0"}`}
          >
            <SmallLogoIcon
              role="img"
              aria-label="Finance app"
              className={"text-content-inverse w-3.5"}
            />
          </div>

          <div
            className={`absolute ${transitionClass}  ${isCollapsed ? "ease-in opacity-0  brightness-15" : "ease-out opacity-100  brightness-100"}`}
          >
            <LargeLogoIcon
              role="img"
              aria-label="Finance app"
              className={"w-30.5 text-content-inverse"}
            />
          </div>
        </div>

        <ul
          className={`${transitionClass} lg:pb-5 lg:mb-6 lg:flex lg:flex-col lg:gap-1 ${isCollapsed ? "pr-2" : "lg:pr-4 xl:pr-5 2xl:pr-6"}`}
        >
          <NavButton
            isAnimating={isAnimating}
            isCollapsed={isCollapsed}
            isDesktop={true}
            navText={"Overview"}
            path={"/overview"}
          >
            <NavOverviewIcon />
          </NavButton>

          <NavButton
            isAnimating={isAnimating}
            isCollapsed={isCollapsed}
            isDesktop={true}
            navText={"Transactions"}
            path={"/transactions"}
          >
            <NavTransactionIcon />
          </NavButton>

          <NavButton
            isAnimating={isAnimating}
            isCollapsed={isCollapsed}
            isDesktop={true}
            navText={"Budgets"}
            path={"/budgets"}
          >
            <NavBudgetIcon />
          </NavButton>

          <NavButton
            isAnimating={isAnimating}
            isCollapsed={isCollapsed}
            isDesktop={true}
            navText={"Pots"}
            path={"/pots"}
          >
            <NavPotsIcon classNameIcon={"w-4.5 h-5.5"} />
          </NavButton>

          <NavButton
            isAnimating={isAnimating}
            isCollapsed={isCollapsed}
            isDesktop={true}
            navText={"Recurring Bills"}
            path={"/recurring-bills"}
          >
            <NavRecurringBillsIcon />
          </NavButton>
        </ul>

        <button
          disabled={isLoading}
          aria-label="Sign out"
          onClick={() => logout()}
          className="focusable-ring disabled:cursor-not-allowed mt-auto py-4 lg:px-4 xl:px-6 2xl:px-8  text-nav-content-default hover:text-nav-content-hover
 sidenav-transition flex items-center hover:cursor-pointer group w-full border-none bg-transparent relative"
        >
          {isLoading && (
            <div className=" shrink-0 w-full size-6 flex items-center justify-center">
              <SpinnerMiniContainer />
            </div>
          )}

          <span
            aria-hidden="true"
            className={`shrink-0 size-6 flex items-center justify-center text-nav-icon-default group-hover:text-nav-icon-hover ${isLoading ? "opacity-0" : "opacity-100"}`}
          >
            <SignOutIcon className={"w-6 h-6"} />
          </span>

          <span
            aria-hidden="true"
            className={`text-preset-3 sidenav-transition ml-4 whitespace-nowrap  ${isCollapsed || isLoading ? "opacity-0 pointer-events-none" : "opacity-100"} `}
          >
            Sign Out
          </span>
        </button>

        <button
          aria-label={`${isCollapsed ? "Expand Menu" : "Minimize Menu"}`}
          aria-expanded={!isCollapsed}
          className={`focusable-ring  py-4 lg:px-4 xl:px-6 2xl:px-8   text-nav-content-default hover:text-nav-content-hover sidenav-transition flex hover:cursor-pointer group`}
          onClick={onToggle}
        >
          <span className={`shrink-0 size-6 flex items-center justify-center`}>
            <MinimizeMenuIcon
              className={`size-5 ${isCollapsed ? "rotate-180" : "rotate-0"} ${isAnimating ? transitionClass : ""}`}
            />
          </span>

          <span
            aria-hidden="true"
            className={`sidenav-transition text-nav-content-default group-hover:text-nav-content-hover  ml-4 text-preset-3 whitespace-nowrap ${isCollapsed ? "opacity-0" : "opacity-100"}`}
          >
            Minimize Menu
          </span>
        </button>
      </div>
    </nav>
  );
}

export default SideNav;
