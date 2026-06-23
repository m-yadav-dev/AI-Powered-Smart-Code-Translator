import { create } from "zustand";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isUserLoggedIn: false,
  isUserSignedUp: false,
  isGuestUser: false,
  isCheckingAuth: false,
  isUserLoggedOut: false,
  isAuthenticated: false,

  checkAuthStatus: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check");
      const user = response.data;
      set({ authUser: user });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while checking authentication status.";
      toast.error(errorMessage);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  registerUser: async (userData) => {
    set({ isUserSignedUp: false });
    try {
        const response = await axiosInstance.post("/auth/register", userData);
        set({ isUserSignedUp: true });
        toast.success("User registered successfully!");
    }
    catch (error) {
        const errorMessage  = error.response?.data?.message || "An error occurred during registration.";
    }
    finally {

    }
  }
}));
