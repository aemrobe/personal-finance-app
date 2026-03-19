import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories";
import { useCurrentUser } from "../authentication/useCurrentUser";

export function useCategories() {
  const { user } = useCurrentUser();

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["categories", `${user?.id}`],
    queryFn: getCategories,
    enabled: !!user?.id,
  });

  return {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  };
}
