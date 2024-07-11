// ./frontend/src/hooks/useApi.ts

import { useState } from "react";
import { useToast } from "../contexts/ToastContext";

interface UseApiProps {
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  queryParams?: string;
  payload?: any;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useApi = ({ method, queryParams = "", payload = null }: UseApiProps) => {
  const { showToast } = useToast();
  const [responseData, setResponseData] = useState<any>(null);

  const apiCall = async (dynamicQueryParams = queryParams, dynamicPayload = payload) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const url = `${API_BASE_URL}${dynamicQueryParams}`;
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      if (dynamicPayload) {
        options.body = JSON.stringify(dynamicPayload);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
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
