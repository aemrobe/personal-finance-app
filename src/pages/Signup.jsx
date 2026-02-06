import AuthPageWrapper from "../features/authentication/AuthPageWrapper";
import SignupForm from "../features/authentication/SignupForm";

function Signup() {
  return (
    <AuthPageWrapper title="sign up" marginTop="mt-29">
      <SignupForm />
    </AuthPageWrapper>
  );
}

export default Signup;
