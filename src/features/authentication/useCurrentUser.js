import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const {
    data: user,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 0,
  });

  return {
    user,
    isAuthenticated: user?.role === "authenticated",
    isLoading,
    error,
    isFetching,
    refetch,
  };
}
