import { createContext, useContext, useState } from "react";

const SideNavContext = createContext();

function SideNavProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const values = { isCollapsed, setIsCollapsed };

  return (
    <SideNavContext.Provider value={values}>{children}</SideNavContext.Provider>
  );
}

function useSideNav() {
  const context = useContext(SideNavContext);

  if (context === undefined) {
    throw new Error("You're using a sidenav context outside of the provider.");
  }

  return context;
}

export { SideNavProvider, useSideNav };
