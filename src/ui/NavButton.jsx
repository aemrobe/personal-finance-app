import { NavLink } from "react-router-dom";

function NavButton({ children, navText, path }) {
  return (
    <li>
      <NavLink
        style={({ isActive }) => ({
          "--ring-color": isActive
            ? "var(--color-green-500)"
            : "var(--color-white)",
          "--ring-offset": "var(--color-grey-900)",
        })}
        className={({ isActive }) =>
          `md:w-26 focusable-ring md:flex md:flex-col md:items-center rounded-t-lg relative group pt-2 px-[1.393rem] pb-3 block ${isActive ? "bg-nav-bg-active active" : ""}`
        }
        to={path}
        aria-label={`${navText} page`}
      >
        <div className="md:mb-1 text-nav-icon-default  flex justify-center items-center group-hover:text-nav-icon-hover  group-[.active]:text-nav-icon-active">
          {children}
        </div>

        {navText && (
          <p
            className={`hidden text-preset-5-bold md:block md:md:whitespace-nowrap capitalize text-center text-nav-content-default group-hover:text-nav-icon-hover
              group-[.active]:text-content-main`}
          >
            {navText}
          </p>
        )}

        <div
          className={`hidden  group-[.active]:block bg-nav-marker-active group-focus-visible:bg-(--ring-color) 
        group-focus-visible:block absolute bottom-0 inset-x-0 h-1  `}
        ></div>
      </NavLink>
    </li>
  );
}

export default NavButton;
