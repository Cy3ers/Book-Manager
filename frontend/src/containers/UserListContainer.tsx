// ./containers/UserListContainer.tsx

import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import { useToast } from "../contexts/ToastContext";
import { registerUser, deleteUser, getUsers } from "../api/api";
import { User } from "../types";

const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (user: { username: string; password: string }) => {
    try {
      const result = await registerUser(user.username, user.password);
      if (result) {
        const fetchedUsers = await getUsers();
        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
        showToast("User Added Successfully!");
      } else {
        showToast("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      showToast("Failed to add user.");
    }
  };

  const removeUser = async (username: string) => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      showToast("User not found.");
      return;
    }

    try {
      const result = await deleteUser(user.id);
      if (result) {
        const fetchedUsers = await getUsers();
        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
        showToast("User Deleted Successfully!");
      } else {
        showToast("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Failed to delete user.");
    }
  };

  return (
    <UserList
      users={users}
      addUser={addUser}
      removeUser={removeUser}
    />
  );
};

export default UserListContainer;
