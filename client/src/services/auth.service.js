import { axiosInstance } from "./api.js";
import toast from "react-hot-toast";

export const registerService = async (data) => {
  try {
    const responseData = await axiosInstance.post(`auth/register`, data);
    console.log(`Response Data: ${responseData}`);
    toast.success("Registration successful!");
    return responseData.data.data;
  } catch (error) {
    console.error("Error in registerService:", error);
    toast.error("Registration failed. Please try again.");
    throw error;
  }
};

export const loginService = async (data) => {
  try {
    const responseData = await axiosInstance.post("auth/login", data);
    toast.success("Login successful!");
    return responseData.data.data;
  } catch (error) {
    console.error("Error in loginService:", error);
    toast.error("Login failed. Please try again.");
    throw error;
  }
};
