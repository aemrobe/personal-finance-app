import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBalance as updateBalanceApi } from "../../services/apiBalance";
import { useToast } from "../../context/ToastContext";

export function useUpdateBalance() {
  const queryClient = useQueryClient();
  const { onShowToastMessage } = useToast();

  const { mutate: updateBalance, isPending: isUpdatingBalance } = useMutation({
    mutationFn: updateBalanceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
    },
    onError: (error) => {
      console.error(`Balance Update Error: ${error}`);
      onShowToastMessage({
        text: `Failed to update a balance: ${error.message}`,
      });
    },
  });

  return {
    updateBalance,
    isUpdatingBalance,
  };
}
