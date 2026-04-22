import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useTransactions() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

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

  //SEARCH TERM
  const searchTerm = searchParams.get("search");

  //SORTBY
  const sortByValue = searchParams.get("sortBy") || "date-desc";

  const [field, direction] = sortByValue.split("-");

  const sortBy = {
    field,
    direction,
  };

  //PAGE
  const pageNumber = searchParams.get("page");

  const page = !pageNumber ? 1 : Number(pageNumber);

  const {
    data: { data, count } = {},
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["transactions", `${user?.id}`, filter, sortBy, page, searchTerm],
    queryFn: () => getTransactions({ filter, sortBy, page, searchTerm }),
    enabled: !!user?.id,
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["transactions", `${user?.id}`, filter, sortBy, page + 1],
      queryFn: () =>
        getTransactions({
          filter,
          sortBy,
          page: page + 1,
        }),
      enabled: !!user?.id,
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["transactions", `${user?.id}`, filter, sortBy, page - 1],
      queryFn: () =>
        getTransactions({
          filter,
          sortBy,
          page: page - 1,
        }),
      enabled: !!user?.id,
    });
  }

  return {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
    count,
  };
}
