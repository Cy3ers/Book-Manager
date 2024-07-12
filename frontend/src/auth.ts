// ./auth.ts
import { loginUser } from "./api/authApi";

interface User {
  username: string;
  token: string;
}

let currentUser: User | null = null;

export const login = async (username: string, password: string): Promise<User | null> => {
  try {
    const user = await loginUser(username, password);
    if (user) {
      currentUser = user;
      return currentUser;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getUser = (): User | null => {
  return currentUser;
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem("token");
  window.location.reload();
};
