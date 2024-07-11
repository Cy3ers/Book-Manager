// ./containers/PassChangeContainer.tsx

import React, { useState } from "react";
import PassChange from "../components/PassChange";
import { useToast } from "../contexts/ToastContext";
import { logout } from "../auth";
import useApi from "../hooks/useApi";

const PassChangeContainer: React.FC = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { showToast } = useToast();
  const [error, setError] = useState("");
  const { apiCall } = useApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      setError("New passwords do not match.");
      showToast("New passwords do not match!");
      return;
    }

    try {
      const success = await apiCall({
        method: "PATCH",
        route: "/users/change-password",
        payload: { oldPass, newPass, confirmPass }
      });

      if (success) {
        showToast("Password changed successfully!");
        logout();
      } else {
        setError("Failed to change password");
        showToast("Password change failed!");
      }
    } catch (error) {
      console.error("Failed to change password", error);
      setError("Failed to change password");
    }
  };

  return (
    <PassChange
      oldPass={oldPass}
      setOldPass={setOldPass}
      newPass={newPass}
      setNewPass={setNewPass}
      confirmPass={confirmPass}
      setConfirmPass={setConfirmPass}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default PassChangeContainer;
