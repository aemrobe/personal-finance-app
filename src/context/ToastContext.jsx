import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ToastMessage from "../ui/ToastMessage";
import { PAGE_TITLE_FOCUS_AFTER_TOAST_DURATION } from "../utils/constants";

const generateUniqueId = () => Date.now() + Math.random();

const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const prevToast = useRef(toasts.length);
  const shouldFocusRef = useRef(false);

  const handleShowToastMessage = useCallback(function (content) {
    const id = generateUniqueId();

    shouldFocusRef.current = content.focusHeaderOnClose || false;

    setToasts((prevToasts) => [{ id, ...content }, ...prevToasts]);
  }, []);

  const handleCloseToastMessage = useCallback(function (id) {
    setToasts((prevToasts) => {
      return prevToasts.filter((toast) => toast.id !== id);
    });
  }, []);

  useEffect(
    function () {
      if (prevToast.current > 0 && toasts.length === 0) {
        if (shouldFocusRef.current) {
          setTimeout(() => {
            const mainHeading = document.querySelector('h1[tabIndex="-1"]');

            if (mainHeading) {
              mainHeading.focus?.();
            }
          }, PAGE_TITLE_FOCUS_AFTER_TOAST_DURATION);

          shouldFocusRef.current = false;
        }
      }

      prevToast.current = toasts.length;
    },
    [toasts.length],
  );

  const value = {
    onShowToastMessage: handleShowToastMessage,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-4 inset-x-0 p-2 flex flex-col space-y-2 items-center z-100 pointer-events-none ">
          {toasts.map((toast) => (
            <ToastMessage
              key={toast.id}
              toastMessageContent={toast}
              onClose={handleCloseToastMessage}
              toastId={toast.id}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error(
      "You are using a toast context outside of the toast provider",
    );
  }

  return context;
}

export { ToastProvider, useToast };
