import { NavLink, Outlet } from "react-router-dom";
import Uploader from "../data/Uploader";
import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <div className="pt-6 px-4 pb-13 relative border-2 border-red-500 min-h-screen">
      <h1>Hello users</h1>
      {/* <Uploader /> */}
      <Outlet />

      <MobileNav />
      {/* <nav>
        <ul className="mb-8 flex flex-col space-y-2">
          <li>
            <NavLink to={"/overview"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/transactions"}>Transactions</NavLink>
          </li>
          <li>
            <NavLink to={"/budgets"}>Budgets</NavLink>
          </li>
          <li>
            <NavLink to={"/pots"}>Pots</NavLink>
          </li>
          <li>
            <NavLink to={"/recurring-bills"}>Recurring Bills</NavLink>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}

export default AppLayout;
