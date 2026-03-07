import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect } from "react";
import SpinnerContainer from "./SpinnerContainer";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useCurrentUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading) return <SpinnerContainer className="bg-surface-app" />;

  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
