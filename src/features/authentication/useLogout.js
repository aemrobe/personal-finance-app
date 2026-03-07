import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { onShowToastMessage } = useToast();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login", {
        replace: true,
      });
      queryClient.removeQueries();
    },
    onError: (error) => {
      onShowToastMessage({
        text: `Failed to logout from app: ${error.message}`,
      });
    },
  });

  return {
    logout,
    isLoading,
  };
}
