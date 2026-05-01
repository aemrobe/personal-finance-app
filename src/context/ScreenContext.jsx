import { createContext, useContext } from "react";
import { useA11yBreakpoint } from "../hooks/useA11yBreakpoint";

const ScreenContext = createContext();

function ScreenProvider({ children }) {
  const isSmallerScreenSize = useA11yBreakpoint();

  const value = {
    isSmallerScreenSize,
  };

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
}

function useScreen() {
  const context = useContext(ScreenContext);

  if (context === undefined) {
    throw new Error("You're using a screen context outside of a provider");
  }

  return context;
}

export { ScreenProvider, useScreen };
