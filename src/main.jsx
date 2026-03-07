import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import ErrorFallBack from "./ui/ErrorFallBack.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallBack}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
