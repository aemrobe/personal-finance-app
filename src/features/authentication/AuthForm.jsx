import { Form, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import AuthRedirect from "./AuthRedirect";

function AuthForm({
  inputs,
  onSubmit,
  isLoading,
  submitButtonText,
  authRedirectText,
  linkName,
  path,
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex flex-col gap-4 mb-8">{inputs}</div>

      <Button isLoading={isLoading} variant={"primary"} isActionButton={true}>
        {submitButtonText}
      </Button>

      <AuthRedirect text={authRedirectText} linkName={linkName} path={path} />
    </form>
  );
}

export default AuthForm;
