// ./components/UserList.tsx

import React, { FC } from "react";
import { User, UserListProps } from "../types";

const UserList: FC<UserListProps> = ({ users, addUser, removeUser }) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2 className='input-header'>Add Users:</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className='submit-btn'
          type='submit'
        >
          Add User
        </button>
      </form>
      <div className='user-list'>
        <h2 className='li-header'>Users</h2>
        <ul>
          {users.map((user: User) => (
            <li key={user.username}>
              {user.username}{" "}
              <button
                className='del-button'
                onClick={() => removeUser(user.username)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
