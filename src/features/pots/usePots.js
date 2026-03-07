import { useQuery } from "@tanstack/react-query";
import { getPots } from "../../services/apiPots";
import { useCurrentUser } from "../authentication/useCurrentUser";

export function usePots() {
  const { user } = useCurrentUser();

  const { data, error, isLoading } = useQuery({
    queryKey: ["pots", user?.id],
    queryFn: getPots,
    enabled: !!user?.id,
  });

  return {
    data,
    error,
    isLoading,
  };
}
