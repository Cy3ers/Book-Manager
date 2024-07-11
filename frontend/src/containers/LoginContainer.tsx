// ./containers/LoginContainer.tsx

import React, { useState } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import useApi from "../hooks/useApi";

interface LoginContainerProps {
  setError: (error: string) => void;
  usernameError?: string | null;
  passwordError?: string | null;
  invalidError?: string | null;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ setError, usernameError, passwordError, invalidError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { apiCall } = useApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim() === "") {
      setError("Username is required");
      return;
    }

    if (password.trim() === "") {
      setError("Password is required");
      return;
    }

    try {
      const user = await apiCall({
        method: "POST",
        route: "/users/login",
        payload: { username, password }
      });

      if (user) {
        localStorage.setItem("token", user.token); // Assuming the token is returned in the user object
        navigate("/dashboard");
        showToast("Login Successful!");
      } else {
        setError("Invalid credentials");
        showToast("Login Failed!");
      }
    } catch (error) {
      console.error("Failed to login", error);
      setError("Failed to login");
    }
  };

  return (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      usernameError={usernameError}
      passwordError={passwordError}
      invalidError={invalidError}
    />
  );
};

export default LoginContainer;
