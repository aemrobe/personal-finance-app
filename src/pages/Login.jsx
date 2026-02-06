import AuthPageWrapper from "../features/authentication/AuthPageWrapper";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <AuthPageWrapper title="login" marginTop="mt-42">
      <LoginForm />
    </AuthPageWrapper>
  );
}

export default Login;
