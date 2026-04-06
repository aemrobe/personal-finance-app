import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBudget as updateBudgetApi } from "../../services/apiBudgets";

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  const { mutate: updateBudget, isPending: isUpdatingBudget } = useMutation({
    mutationFn: updateBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });

  return {
    updateBudget,
    isUpdatingBudget,
  };
}
