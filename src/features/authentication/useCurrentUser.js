import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 0,
    throwOnError: true,
  });

  return {
    user,
    isAuthenticated: user?.role === "authenticated",
    isLoading,
  };
}
