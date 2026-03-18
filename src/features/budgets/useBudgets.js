import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudgets";
import { useCurrentUser } from "../authentication/useCurrentUser";

export function useBudgets() {
  const { user } = useCurrentUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["budgets", user?.id],
    queryFn: getBudgets,
    enabled: !!user?.id,
  });

  return {
    data,
    isLoading,
  };
}
