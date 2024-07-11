// ./components/PassChange.tsx

import React, { FC } from "react";

interface PassChangeProps {
  oldPass: string;
  setOldPass: (oldPass: string) => void;
  newPass: string;
  setNewPass: (newPass: string) => void;
  confirmPass: string;
  setConfirmPass: (confirmPass: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

const PassChange: FC<PassChangeProps> = ({
  oldPass,
  setOldPass,
  newPass,
  setNewPass,
  confirmPass,
  setConfirmPass,
  handleSubmit,
  error
}) => {
  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input
            type='password'
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type='password'
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type='password'
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>
        <button
          className='submit-btn'
          type='submit'
        >
          Change Password
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PassChange;
