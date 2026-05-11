import AuthPageWrapper from "../features/authentication/AuthPageWrapper";
import SignupForm from "../features/authentication/SignupForm";

function Signup() {
  return (
    <AuthPageWrapper title="sign up">
      <SignupForm />
    </AuthPageWrapper>
  );
}

export default Signup;
