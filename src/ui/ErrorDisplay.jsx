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
    pageTitle.current?.focus();
  }, []);

  return (
    <div
      role="alert"
      className="bg-surface-primary max-w-lg md:max-w-2xl rounded-xl shadow-md p-8 md:p-12 flex flex-col items-center"
    >
      <Heading
        tabIndex={"-1"}
        className="text-preset-2 md:text-preset-1 mb-3 md:mb-5 text-center text-content-main outline-none"
        ref={pageTitle}
        aria-describedby="error-text"
      >
        Something went wrong <span aria-hidden="true">🤔</span>
      </Heading>

      <p
        id="error-text"
        className="text-preset-4 md:text-base mb-8 md:mb-10 text-center text-content-secondary wrap-break-word max-w-md leading-relaxed"
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
