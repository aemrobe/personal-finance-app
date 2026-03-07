import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPot as createPotApi } from "../../services/apiPots";

export function useCreatePot() {
  const queryClient = useQueryClient();

  const { mutate: createPot, isPending: isCreatingPot } = useMutation({
    mutationFn: createPotApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pots"],
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  return {
    createPot,
    isCreatingPot,
  };
}
