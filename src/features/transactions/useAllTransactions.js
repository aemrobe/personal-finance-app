import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../services/apiTransactions";

export function useAllTransactions() {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["all-transactions"],
    queryFn: getAllTransactions,
  });

  return {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  };
}
