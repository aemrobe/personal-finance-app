import { useState } from "react";
import { useSignup } from "./useSignup";
import AuthForm from "./AuthForm";
import Input from "../../ui/Input";
import { ShowPasswordIcon, HidePasswordIcon } from "../../ui/Icons";
import { useForm } from "react-hook-form";
import {
  EMAIL_PATTERN,
  FIELD_REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
} from "../../utils/constants";

function SignupForm() {
  const { signUp, isLoading } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleSignup = function ({ fullName, email, password }) {
    signUp({
      fullName,
      email,
      password,
    });
  };

  return (
    <AuthForm
      isLoading={isLoading}
      onSubmit={handleSubmit(handleSignup)}
      submitButtonText="Create account"
      authRedirectText="Already have an account?"
      linkName="login"
      path="/login"
      inputs={
        <>
          <Input
            type={"text"}
            label={"Name"}
            placeholder={"Enter your name..."}
            id={"fullName"}
            error={errors.fullName?.message}
            errorId={"errorFullName"}
            isLoading={isLoading}
            {...register("fullName", { required: FIELD_REQUIRED_MESSAGE })}
          />
          <Input
            type={"email"}
            autoComplete={"off"}
            label={"Email"}
            placeholder={"Enter your email..."}
            id={"email"}
            error={errors.email?.message}
            errorId={"errorEmail"}
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
            autoComplete={"new-password"}
            type={showPassword ? "text" : "password"}
            onIconClick={() => setShowPassword((prev) => !prev)}
            label={"Create Password"}
            placeholder={"Choose a strong password..."}
            labelForIcon={
              showPassword ? "Hide the password" : "Show the password"
            }
            id={"password"}
            error={errors.password?.message}
            errorId={"errorPassword"}
            isLoading={isLoading}
            icon={
              showPassword ? (
                <HidePasswordIcon className={"text-content-main"} />
              ) : (
                <ShowPasswordIcon className={"text-content-main"} />
              )
            }
            helperText="Passwords must be at least 8 characters"
            {...register("password", {
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 8,
                message: "Must be at least 8 characters",
              },
            })}
          />
        </>
      }
    />
  );
}

export default SignupForm;
