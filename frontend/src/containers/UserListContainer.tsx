// ./containers/UserListContainer.tsx

import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import { useToast } from "../contexts/ToastContext";
import { User } from "../types";
import useApi from "../hooks/useApi";

const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { showToast } = useToast();
  const { apiCall } = useApi();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await apiCall({ method: "GET", route: "/users" });
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUser = async (user: { username: string; password: string }) => {
    try {
      const result = await apiCall({ method: "POST", route: "/users/register", payload: user });
      if (result) {
        const fetchedUsers = await apiCall({ method: "GET", route: "/users" });
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
      const result = await apiCall({ method: "DELETE", route: `/users/${user.id}` });
      if (result) {
        const fetchedUsers = await apiCall({ method: "GET", route: "/users" });
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
