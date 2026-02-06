import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions() {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return {
    data,
    isLoading,
  };
}
