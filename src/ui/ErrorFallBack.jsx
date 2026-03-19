import { useRouteError } from "react-router-dom";
import ErrorDisplay from "./ErrorDisplay";

function ErrorFallBack({ error = "", resetErrorBoundary = null }) {
  const errorFromRouter = useRouteError();

  const errorMessage =
    errorFromRouter?.data ||
    errorFromRouter?.message ||
    error?.message ||
    "An unknown error occurred";

  return (
    <div className="min-h-screen flex  justify-center items-center px-4 bg-surface-app">
      <ErrorDisplay error={errorMessage} onRetry={resetErrorBoundary} as="h1" />
    </div>
  );
}

export default ErrorFallBack;
