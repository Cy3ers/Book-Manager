// ./frontend/src/hooks/useApi.ts

import { useState } from "react";
import { useToast } from "../contexts/ToastContext";

interface UseApiProps {
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  route: string;
  payload?: any;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useApi = () => {
  const { showToast } = useToast();
  const [responseData, setResponseData] = useState<any>(null);

  const apiCall = async ({ method, route, payload }: UseApiProps) => {
    try {
      const token = localStorage.getItem("token");

      const url = `${API_BASE_URL}${route}`;
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }) // Conditionally add the Authorization header
        }
      };

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      setResponseData(data);
      return data;
    } catch (error) {
      console.error("API call failed", error);
      showToast(`API call failed: ${error.message}`);
      return null;
    }
  };

  return { apiCall, responseData };
};

export default useApi;
