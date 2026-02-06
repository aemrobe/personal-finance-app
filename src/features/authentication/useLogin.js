import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.user.user_metadata.fullName}`);

      navigate("/overview", { replace: true });
    },
    onError: (error) => {
      console.error(error.message);
      if (error.message === "Failed to fetch") {
        toast.error("Network error. Please check your connection.");
      }
    },
  });

  const isNetworkError = error?.message === "Failed to fetch";

  const displayError =
    error && !isNetworkError ? "Invalid email or password" : null;

  return {
    login,
    isLoading,
    serverError: displayError,
  };
}
