/*

    Create an Axios instance with a base URL and an interceptor to include the JWT token in the 
    Authorization header for all requests.

    - The baseURL is set to the value of VITE_API_URL from the environment variables, or defaults to 
    "http://localhost:5000/api" if not provided.

    - The interceptor checks for the presence of a token in localStorage and, if found, adds it to the 
    Authorization header of each outgoing request in the format "Bearer <token>".

    - This setup allows for seamless authentication with the backend API by automatically including the JWT token in all requests, 
    enabling protected routes and resources to be accessed without manually adding the token each time.

    - Note: Ensure that the token is securely stored and handled in the client application, and consider using secure cookies 
    or other storage mechanisms for production environments to enhance security.



*/

import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 60000, // 60s — Gemini AI responses can take >10s for complex code
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ✅ response interceptor — was incorrectly registered as a request interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
    }
    return Promise.reject(error);
  },
);
