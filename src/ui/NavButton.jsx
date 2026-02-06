import { NavLink } from "react-router-dom";

function NavButton({ children, navText, path }) {
  return (
    <li className="pt-2 px-[1.393rem] pb-3">
      <NavLink className={"block"} to={path}>
        {children}
        {navText && (
          <p className={`text-nav-content-default hover:text-nav-icon-hover`}>
            {navText}
          </p>
        )}
      </NavLink>
    </li>
  );
}

export default NavButton;
