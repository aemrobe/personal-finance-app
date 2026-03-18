import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useQueryError } from "../../hooks/useQueryError";

export function useCategories() {
  const { user } = useCurrentUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", `${user?.id}`],
    queryFn: getCategories,
    enabled: !!user?.id,
  });

  useQueryError(error, "categories");

  return {
    data,
    isLoading,
  };
}
