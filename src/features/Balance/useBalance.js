import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../../services/apiBalance";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { EMPTY_BALANCE } from "../../utils/constants";

export function useBalance() {
  const { user } = useCurrentUser();

  const { data, isLoading } = useQuery({
    queryKey: ["balance", user?.id],
    queryFn: getBalance,
  });

  return {
    isLoading,
    balance: !data ? EMPTY_BALANCE : data[0],
  };
}
