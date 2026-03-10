import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useCurrentUser } from "../authentication/useCurrentUser";

export function useTransactions() {
  const { user } = useCurrentUser();

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", `${user?.id}`],
    queryFn: getTransactions,
    enabled: !!user?.id,
  });

  return {
    data,
    isLoading,
  };
}
