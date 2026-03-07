import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { seedNewUserData } from "../../services/apiSeed";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useLogout } from "./useLogout";

export function useSignup() {
  const navigate = useNavigate();
  const { onShowToastMessage } = useToast();
  const { logout } = useLogout();

  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: async (data) => {
      try {
        const userId = data.user.id;
        await seedNewUserData(userId);

        onShowToastMessage({
          text: `Welcome to your new Finance Dashboard!`,
        });
        navigate("/overview");
      } catch (error) {
        console.error(error.message);
        onShowToastMessage({
          text: `Account created, but we couldn't load the sample. please try logging in`,
        });

        logout();
      }
    },
    onError: (err) => {
      onShowToastMessage({
        text: `Failed to create a user: ${err.message}`,
      });
      console.error("Failed to create a user!", err.message);
    },
  });

  return {
    signUp,
    isLoading,
  };
}
