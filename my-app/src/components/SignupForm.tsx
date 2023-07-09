import React, { useState } from "react";
import { back_url } from "./url";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate email and password
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email address");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // If validations pass, proceed with form submission
    axios
      .post(`${back_url}/user/signup`, { email, password, name })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value: string): boolean => {
    return value.length >= 6;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />

        <button className="button" type="submit">
          Signup
        </button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default SignupForm;
