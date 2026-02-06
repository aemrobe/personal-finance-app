import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { seedNewUserData } from "../../services/apiSeed";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: async (data) => {
      const toastId = toast.loading(
        "Creating your account and setting up your data...",
      );

      try {
        const userId = data.user.id;
        await seedNewUserData(userId);

        toast.success("Welcome to your new Finance Dashboard!", {
          id: toastId,
        });

        navigate("/overview");
      } catch (error) {
        console.error(error.message);
        toast.error(
          "Account created, but we couldn't load the sample. please try logging in",
          {
            id: toastId,
          },
        );
      }
    },
    onError: (err) => {
      toast.error("Failed to create a user!");
      console.error("Failed to create a user!", err.message);
    },
  });

  return {
    signUp,
    isLoading,
  };
}
