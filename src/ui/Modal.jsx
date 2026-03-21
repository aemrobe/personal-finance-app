import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ModalOverlay from "./ModalOverlay";
import { CloseIcon } from "./Icons";
import { useOutsideClicks } from "../hooks/useOutsideClicks";
import { createPortal } from "react-dom";
import { MODAL_FOCUS_DURATION } from "../utils/constants";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const [lastFocusableElement, setLastFocusableElement] = useState(null);

  const close = useCallback(() => {
    setOpenName("");
  }, []);

  const restoreFocus = useCallback(() => {
    const returnTarget =
      typeof lastFocusableElement === "string"
        ? document.querySelector(lastFocusableElement)
        : lastFocusableElement;

    if (returnTarget) {
      setTimeout(() => returnTarget.focus(), MODAL_FOCUS_DURATION);
    }
  }, [lastFocusableElement]);

  const open = useCallback((name, returnSelector) => {
    setOpenName(name);
    setLastFocusableElement(returnSelector || document.activeElement);
  }, []);

  useEffect(
    function () {
      const app = document.getElementById("root");
      if (openName !== "") app.setAttribute("inert", "");
      else app.removeAttribute("inert");
    },
    [openName],
  );

  const value = useMemo(
    () => ({
      openName,
      open,
      close,
      restoreFocus,
    }),
    [close, open, openName, restoreFocus],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function Open({ children, modalName, returnToSelector }) {
  const { open } = useContext(ModalContext);

  const handleOpen = (e) => {
    open(modalName, returnToSelector);

    if (children.props.onClick) children.props.onClick(e);
  };

  return cloneElement(children, {
    onClick: handleOpen,
  });
}

function Window({ children, modalName, titleId, contentId }) {
  const { close, openName, restoreFocus } = useContext(ModalContext);
  const modalRef = useOutsideClicks(() => {
    close();
    restoreFocus();
  });

  const hasFocussedRef = useRef(false);

  useEffect(() => {
    if (modalName !== openName) {
      hasFocussedRef.current = false;
      return;
    }

    if (hasFocussedRef.current) return;

    const modalElement = modalRef.current;

    if (!modalElement) return;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        restoreFocus();
      }

      if (e.key === "Tab") {
        const focusableElements =
          modalElement.querySelectorAll(focusableSelector);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // 1. Give the browser a tiny moment to paint the modal
    const timer = setTimeout(() => {
      // 2. Look for the first input, select, or button inside the modal
      // We exclude the Close button (usually at the top) to focus the form instead
      const firstInput = modalRef.current.querySelector(
        'input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([aria-label="Close Modal"])',
      );

      const initialFocus =
        firstInput || modalElement.querySelectorAll(focusableSelector)[0];

      if (initialFocus) {
        hasFocussedRef.current = true;
        initialFocus.focus();
      }
    }, 50);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [modalName, openName, close, modalRef, restoreFocus]);

  if (modalName !== openName) return;

  return createPortal(
    <ModalOverlay>
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby={titleId}
        aria-describedby={contentId}
        tabIndex={"-1"}
        className={`outline-none z-50 px-5 py-6 bg-surface-primary w-[89.3%] fixed top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 rounded-xl`}
      >
        <button
          onClick={() => {
            close();
            restoreFocus();
          }}
          aria-label="Close Modal"
          className="focusable-ring text-content-secondary  rounded-full w-8 h-8 flex items-center justify-center absolute right-5 top-6 z-51"
        >
          <CloseIcon />
        </button>

        {cloneElement(children, {
          onCloseModal: () => {
            close();
          },
          restoreFocus,
          titleId,
          contentId,
        })}
      </div>
    </ModalOverlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
