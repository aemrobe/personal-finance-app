import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePot as deletePotApi } from "../../services/apiPots";
import { useToast } from "../../context/ToastContext";

export function useDeletePot() {
  const queryClient = useQueryClient();
  const { onShowToastMessage } = useToast();

  const { mutate: deletePot, isPending: isDeletingPot } = useMutation({
    mutationFn: deletePotApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pots"],
      });
      onShowToastMessage({
        text: `Pot successfully deleted`,
        focusHeaderOnClose: true,
      });
    },
    onError: (error) => {
      console.error(error.message);
      onShowToastMessage({
        text: `Failed to delete a pot: ${error.message}`,
      });
    },
  });

  return {
    deletePot,
    isDeletingPot,
  };
}
