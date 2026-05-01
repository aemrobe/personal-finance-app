import { useEffect, useState } from "react";
import { TABLET_BREAKPOINT } from "../utils/constants";

const getRoomRemSize = () => {
  const rootSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  return rootSize;
};

export function useA11yBreakpoint() {
  const [isSmallerScreenSize, setIsSmallerScreenSize] = useState(() => {
    const rootRoomSize = getRoomRemSize();

    return window.innerWidth / rootRoomSize < TABLET_BREAKPOINT;
  });

  useEffect(() => {
    const handleCheckSize = function () {
      const rootRoomSize = getRoomRemSize();

      const isMobileScreenSize =
        window.innerWidth / rootRoomSize < TABLET_BREAKPOINT;

      setIsSmallerScreenSize((prev) => {
        if (prev !== isMobileScreenSize) return isMobileScreenSize;

        return prev;
      });
    };

    const intervalId = setInterval(handleCheckSize, 500);

    window.addEventListener("resize", handleCheckSize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleCheckSize);
    };
  }, []);

  return isSmallerScreenSize;
}
