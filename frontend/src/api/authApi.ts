// ./api/authApi.ts
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (
  username: string,
  password: string
): Promise<{ username: string; token: string } | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      return { username, token: data.token };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to login", error);
    return null;
  }
};

export const changePass = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/users/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword
      })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {
    console.error("Failed to change password", error);
    return false;
  }
};
