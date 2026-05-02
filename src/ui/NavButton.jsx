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
          `md:w-26 lg:w-full focusable-ring md:flex md:flex-col lg:flex-row md:items-center lg:gap-4 rounded-t-lg lg:rounded-t-none lg:rounded-tr-lg lg:rounded-br-lg relative group pt-2 lg:py-4 px-[1.393rem] lg:px-4 xl:px-6 2xl:px-8 pb-3 lg:h-14 block ${isActive ? "bg-nav-bg-active active" : ""}`
        }
        to={path}
        aria-label={`${navText} page`}
      >
        <div className="md:mb-1 lg:mb-0 text-nav-icon-default  flex justify-center items-center group-hover:text-nav-icon-hover  group-[.active]:text-nav-icon-active">
          {children}
        </div>

        {navText && (
          <p
            className={`hidden text-preset-5-bold lg:text-preset-3 md:block md:whitespace-nowrap capitalize text-center text-nav-content-default group-hover:text-nav-icon-hover
              group-[.active]:text-content-main`}
          >
            {navText}
          </p>
        )}

        <div
          className={`hidden  group-[.active]:block bg-nav-marker-active group-focus-visible:bg-(--ring-color) 
        group-focus-visible:block absolute bottom-0 inset-x-0  lg:left-0  lg:inset-y-0  h-1 lg:h-full lg:w-1 `}
        ></div>
      </NavLink>
    </li>
  );
}

export default NavButton;
