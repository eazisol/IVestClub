import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { appData } from "../Context/AppContext";
import { baseUrl } from "../../../apiConfig";

const apiCall = async ({ url, method = "POST", data, headers }) => {
  console.log("Making API request:", { url, method, data, headers });

  const response = await axios({
    url: `${baseUrl}${url}`,
    method,
    data,
    headers,
  });
  console.log("Response received:", response);
  return response.data;
};

const useApi = () => {
  const { setSnackBarData, userData } = appData();

  const mutation = useMutation({
    mutationFn: async ({ url, method, data, sendHeaders = false }) => {
      let headers = {};
      if (sendHeaders) {
        headers = {
          Authorization: `Bearer ${userData.access_token}`,
        };
        if (data instanceof FormData) {
          headers["Content-Type"] = "multipart/form-data";
        } else {
          headers["Content-Type"] = "application/json";
        }
      }

      const responseData = await apiCall({ url, method, data, headers });

      return responseData;
    },
    onSuccess: (data) => {
      console.log("API request successful:", data);
    },
    onError: (error) => {
      console.error("API request error:", error);

      // Check if error has a response and a message
      if (error.response && error.response.data && error.response.data.message) {
        setSnackBarData({
          visibility: true,
          error: "error",
          text: error.response.data.message,
        });
      } 
      // Check if error has a message property
      else if (error.message) {
        setSnackBarData({
          visibility: true,
          error: "error",
          text: error.message,
        });
      } 
      // Fallback for unexpected error structures
      else {
        setSnackBarData({
          visibility: true,
          error: "error",
          text: "Something went wrong",
        });
      }
    },
  });

  return mutation;
};

export default useApi;
