import { createContext, useCallback, useContext, useState } from "react";
import { EllipsisIcon } from "./Icons";
import { useOutsideClicks } from "../hooks/useOutsideClicks";
import { ANIMATION_DURATION } from "../utils/constants";

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const open = setOpenId;
  const [showAnimation, setShowAnimation] = useState(false);

  const close = useCallback(() => {
    setShowAnimation(false);
    setTimeout(function () {
      setOpenId("");
    }, ANIMATION_DURATION);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        open,
        close,
        showAnimation,
        setShowAnimation,
        openId,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id, name }) {
  const { open, close, setShowAnimation, openId } = useContext(MenuContext);

  const handleClick = function (e) {
    if (!openId || openId !== id) {
      open(id);
      setShowAnimation(true);
    } else {
      close();
    }
    e.stopPropagation();
  };

  return (
    <button
      id={`menu-trigger-${id}`}
      aria-label={`${openId === id ? `close menu for ${name}` : `open menu for ${name}`}`}
      className="focusable-ring text-icon-tertiary"
      onClick={handleClick}
    >
      <EllipsisIcon />
    </button>
  );
}

function List({ id, children }) {
  const { openId, close, showAnimation } = useContext(MenuContext);

  const ref = useOutsideClicks(close);

  if (openId !== id) return;

  return (
    <div
      ref={ref}
      className={`mt-4 z-20 absolute top-full right-0 dropdown-menucontainer   ${showAnimation ? "open" : "close"} `}
    >
      <div className="dropdown-menu bg-surface-primary px-5 rounded-lg shadow-3xl">
        <ul className="divide-y divide-border-subtle">{children}</ul>
      </div>
    </div>
  );
}

function Button({ children, color, onClick, disabled }) {
  const { close } = useContext(MenuContext);

  function handleClick(e) {
    onClick?.();
    close();
    e.stopPropagation();
  }

  return (
    <li className="py-1">
      <button
        disabled={disabled}
        className={`focusable-ring  block w-full py-2 capitalize ${color}`}
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
}

Menus.List = List;
Menus.Button = Button;
Menus.Toggle = Toggle;

export default Menus;
