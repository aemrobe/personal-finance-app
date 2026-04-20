import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect } from "react";
import SpinnerContainer from "./SpinnerContainer";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useCurrentUser();

  const supabaseKey = Object.keys(localStorage).find((key) =>
    key.endsWith("-auth-token"),
  );

  const localSession = JSON.parse(localStorage.getItem(supabaseKey));
  const hasLocalSession = localSession?.user?.role === "authenticated";

  useEffect(
    function () {
      const isOffline = !window.navigator.onLine;

      if (!isOffline && !isAuthenticated && !isLoading) {
        navigate("/login");
      }

      if (isOffline && !hasLocalSession && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate, hasLocalSession],
  );

  if (isAuthenticated || (!window.navigator.onLine && hasLocalSession))
    return <>{children}</>;

  if (isLoading) return <SpinnerContainer className="bg-surface-app" />;

  return null;
}

export default ProtectedRoute;
