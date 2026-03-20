import { useEffect, useRef } from "react";
import Button from "./Button";

function ErrorDisplay({
  error = null,
  onRetry = null,
  as: Heading = "h2",
  isLoading = false,
}) {
  const pageTitle = useRef(null);

  useEffect(function () {
    pageTitle.current.focus();
  }, []);

  return (
    <div
      role="alert"
      className="bg-surface-primary max-w-lg rounded-xl shadow-md p-8 flex flex-col items-center"
    >
      <Heading
        tabIndex={"-1"}
        className="text-preset-2 mb-3 text-center text-content-main outline-none"
        ref={pageTitle}
        aria-describedby="error-text"
      >
        Something went wrong <span aria-hidden="true">🤔</span>
      </Heading>

      <p
        id="error-text"
        className="text-preset-4 mb-8 text-center text-content-secondary break-all leading-relaxed"
      >
        {error}
      </p>

      <Button
        disabled={isLoading}
        variant={"primary"}
        isActionButton={true}
        onClick={() => {
          if (onRetry) onRetry();
          else window.location.replace(window.location.pathname);
        }}
      >
        Try again!
      </Button>
    </div>
  );
}

export default ErrorDisplay;
