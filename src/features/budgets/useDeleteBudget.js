import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget as deleteBudgetApi } from "../../services/apiBudgets";
import { useToast } from "../../context/ToastContext";

export function useDeleteBudget() {
  const { onShowToastMessage } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteBudget, isPending: isDeletingBudget } = useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });

      onShowToastMessage({
        text: `Budget successfully deleted`,
        focusHeaderOnClose: true,
      });
    },
    onError: (error) => {
      console.error(error.message);
      onShowToastMessage({
        text: `Failed to delete a budget: ${error.message}`,
      });
    },
  });

  return {
    deleteBudget,
    isDeletingBudget,
  };
}
