import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useSearchParams } from "react-router-dom";

export function useTransactions() {
  const { user } = useCurrentUser();

  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("category");

  const filter =
    !filterValue || filterValue === "All Transactions"
      ? null
      : {
          field: "categories.category",
          value: filterValue,
        };

  //SORTBY
  const sortByValue = searchParams.get("sortBy") || "date-asc";

  const [field, direction] = sortByValue.split("-");

  const sortBy = {
    field,
    direction,
  };

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["transactions", `${user?.id}`, filter, sortBy],
    queryFn: () => getTransactions({ filter, sortBy }),
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
