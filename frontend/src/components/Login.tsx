// ./components/Login.tsx

import React from "react";

interface LoginProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  usernameError?: string | null;
  passwordError?: string | null;
  invalidError?: string | null;
}

const Login: React.FC<LoginProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  usernameError,
  passwordError,
  invalidError
}) => {
  return (
    <div>
      <h2 className='navbar'>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <div className='error-msg'>{usernameError}</div>}
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className='error-msg'>{passwordError}</div>}
        {invalidError && <div className='error-msg'>{invalidError}</div>}
        <button
          className='submit-btn'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
