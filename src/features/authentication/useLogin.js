import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

export function useLogin() {
  const navigate = useNavigate();
  const { onShowToastMessage } = useToast();

  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      onShowToastMessage({
        text: `Welcome back, ${data.user.user_metadata.fullName}`,
      });

      navigate("/pots", { replace: true });
    },
    onError: (error) => {
      console.error(error.message);
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  return {
    login,
    isLoading,
  };
}
