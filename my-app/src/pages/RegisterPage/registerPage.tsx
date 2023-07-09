import React from "react";
import RegisterPage from "../../components/RegisterPage";
import "./registerPage.css";

const CreateRestro: React.FC = () => {
  return (
    <div className="registerpage">
      <h1>Register me ! </h1>
      <RegisterPage />
    </div>
  );
};

export default CreateRestro;
