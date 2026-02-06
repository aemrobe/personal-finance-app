import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useCurrentUser();

  console.log("isAuthenticated", isAuthenticated);

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading) return <p>Loading data...</p>;

  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
