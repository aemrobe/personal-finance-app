import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget as createBudgetApi } from "../../services/apiBudgets";

export function useCreateBudget() {
  const queryClient = useQueryClient();

  const { mutate: createBudget, isPending: isCreatingBudget } = useMutation({
    mutationFn: createBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return {
    createBudget,
    isCreatingBudget,
  };
}
