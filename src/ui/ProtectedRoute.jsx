import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect, useState } from "react";
import SpinnerContainer from "./SpinnerContainer";
import supabase from "../services/supabase";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useCurrentUser();

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  const [hasLocalSession, setHasLocalSession] = useState(false);

  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      // getSession() resolves instantly from localStorage without a network call
      const { data } = await supabase.auth.getSession();

      setHasLocalSession(data?.session?.user?.role === "authenticated");
      setIsCheckingSession(false);
    }

    checkSession();
  }, [isOnline]);

  useEffect(function () {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isLoading || isCheckingSession) return;

    if (isOnline && !isAuthenticated) {
      navigate("/login");
    }

    if (!isOnline && !hasLocalSession) {
      navigate("/login");
    }
  }, [
    hasLocalSession,
    isAuthenticated,
    isCheckingSession,
    isLoading,
    isOnline,
    navigate,
  ]);

  if (isAuthenticated || (!isOnline && hasLocalSession)) return <>{children}</>;

  if (isLoading || isCheckingSession)
    return <SpinnerContainer className="bg-surface-app" />;

  return null;
}

export default ProtectedRoute;
