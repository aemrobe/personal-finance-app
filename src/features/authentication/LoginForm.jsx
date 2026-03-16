import { useState } from "react";
import { useLogin } from "./useLogin";
import Input from "../../ui/Input";
import { ShowPasswordIcon, HidePasswordIcon } from "../../ui/Icons";
import AuthForm from "./AuthForm";
import { useForm } from "react-hook-form";
import {
  EMAIL_PATTERN,
  FIELD_REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
} from "../../utils/constants";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "bereket@gmail.com",
      password: "121343565",
    },
  });

  const { login, isLoading } = useLogin();

  const handleLogin = function ({ email, password }) {
    login(
      {
        email,
        password,
      },
      {
        onError: (err) => {
          if (err.message !== "Failed to fetch") {
            setError(
              "password",
              {
                type: "manual",
                message: `${err.message}`,
              },
              {
                shouldFocus: true,
              },
            );
          }
        },
      },
    );
  };

  return (
    <AuthForm
      isLoading={isLoading}
      onSubmit={handleSubmit(handleLogin)}
      submitButtonText="Login"
      authRedirectText="Need to create an account?"
      linkName="sign up"
      path="/signup"
      inputs={
        <>
          <Input
            type={"email"}
            label={"Email"}
            autoComplete="off"
            error={errors.email?.message}
            errorId={"emailError"}
            placeholder={"Enter your email..."}
            id={"email"}
            isLoading={isLoading}
            {...register("email", {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_PATTERN,
                message: INVALID_EMAIL_MESSAGE,
              },
            })}
          />
          <Input
            type={showPassword ? "text" : "password"}
            onIconClick={() => setShowPassword((prev) => !prev)}
            label={"Password"}
            labelForIcon={
              showPassword ? "Hide the password" : "Show the password"
            }
            errorId={"passwordError"}
            error={errors.password?.message}
            placeholder={"Enter your password..."}
            id={"password"}
            isLoading={isLoading}
            autoComplete={"new-password"}
            icon={
              showPassword ? (
                <HidePasswordIcon className={"text-content-main"} />
              ) : (
                <ShowPasswordIcon className={"text-content-main"} />
              )
            }
            {...register("password", {
              required: FIELD_REQUIRED_MESSAGE,
            })}
          />
        </>
      }
    />
  );
}

export default LoginForm;
