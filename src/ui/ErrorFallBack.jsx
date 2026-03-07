import { useRouteError } from "react-router-dom";
import Button from "./Button";
import { useEffect, useRef } from "react";

function ErrorFallBack({ error = "", resetErrorBoundary = null }) {
  const errorFromRouter = useRouteError();
  const pageTitle = useRef(null);

  useEffect(function () {
    pageTitle.current.focus();
  }, []);

  return (
    <div className="min-h-screen flex  justify-center items-center px-4 bg-surface-app">
      <div
        role="alert"
        className="bg-surface-primary   max-w-lg rounded-xl shadow-md p-8 flex flex-col items-center"
      >
        <h1
          tabIndex={"-1"}
          className="text-preset-2 mb-3 text-center text-content-main outline-none"
          ref={pageTitle}
          aria-describedby="error-text"
        >
          Something went wrong <span aria-hidden="true">🤔</span>
        </h1>

        <p
          id="error-text"
          className="text-preset-4 mb-8 text-center text-content-secondary break-all leading-relaxed"
        >
          {errorFromRouter?.data ||
            errorFromRouter?.message ||
            error?.message ||
            "An unknown error occurred"}
        </p>

        <Button
          variant={"primary"}
          isActionButton={true}
          onClick={() => {
            resetErrorBoundary?.() || window.location.replace("/");
          }}
        >
          Try again!
        </Button>
      </div>
    </div>
  );
}

export default ErrorFallBack;
