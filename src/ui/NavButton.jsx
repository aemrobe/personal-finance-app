import { NavLink } from "react-router-dom";

function NavButton({
  isCollapsed,
  isAnimating,
  isDesktop = false,
  children,
  navText,
  path,
}) {
  const transitionClass = isAnimating ? "sidenav-transition" : "";

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
          `${transitionClass} overflow-hidden md:w-26 lg:w-full focusable-ring md:flex md:flex-col lg:flex-row md:items-center  rounded-t-lg lg:rounded-t-none lg:rounded-tr-lg lg:rounded-br-lg relative group pt-2 lg:py-4 px-[1.393rem] lg:px-4 xl:px-6 2xl:px-8 pb-3 lg:h-14 block ${isActive ? "bg-nav-bg-active active" : ""}`
        }
        to={path}
        aria-label={`${navText} page`}
      >
        <div
          className={`shrink-0 ${transitionClass} md:mb-1 lg:mb-0 text-nav-icon-default  flex justify-center items-center group-hover:text-nav-icon-hover  group-[.active]:text-nav-icon-active ${isCollapsed ? "lg:group-[.active]:text-nav-content-active" : "lg:group-[.active]:text-nav-icon-active"}`}
        >
          {children}
        </div>

        {navText && (
          <p
            className={`${isDesktop && isCollapsed ? "opacity-0" : "opacity-100"} hidden text-preset-5-bold lg:text-preset-3 md:block md:whitespace-nowrap capitalize  ${transitionClass} text-center lg:ml-4 text-nav-content-default group-hover:text-nav-icon-hover
              group-[.active]:text-content-main`}
          >
            {navText}
          </p>
        )}

        <div
          className={`hidden  group-[.active]:block bg-nav-marker-active group-focus-visible:bg-(--ring-color) 
        group-focus-visible:block absolute bottom-0 inset-x-0  lg:left-0  lg:inset-y-0  h-1 lg:h-full lg:w-1 ${isAnimating ? "animate-marker-pulse" : ""} transform`}
        ></div>
      </NavLink>
    </li>
  );
}

export default NavButton;
