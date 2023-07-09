import React from "react";
import SignupForm from "../../components/SignupForm";
import "./SignupPage.css";

interface SignupPageProps {}

const SignupPage: React.FC<SignupPageProps> = () => {
  return (
    <div className="signuppage">
      <h1>Signup</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
