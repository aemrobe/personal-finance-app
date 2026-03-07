import { useEffect, useRef } from "react";

export function useOutsideClicks(handler) {
  const ref = useRef(null);

  useEffect(
    function () {
      const handleClick = function (e) {
        if (ref.current && !ref?.current?.contains(e.target)) {
          handler();
        }
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    },
    [handler],
  );

  return ref;
}
