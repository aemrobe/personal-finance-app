import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePot as updatePotApi } from "../../services/apiPots";

export function useUpdatePot() {
  const queryClient = useQueryClient();

  const { mutate: updatePot, isPending: isUpdatingPot } = useMutation({
    mutationFn: updatePotApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pots"],
      });
    },
  });

  return {
    updatePot,
    isUpdatingPot,
  };
}
