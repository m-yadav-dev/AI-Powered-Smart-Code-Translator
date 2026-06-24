import { create } from "zustand";
import { axiosInstance } from "../services/api";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: false,
  isCheckingAuth: false,

  checkAuthStatus: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.data || response.data });
    } catch (error) {
      console.error("Error checking auth status:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      set({ authUser: response.data.data || response.data });
      toast.success("User registered successfully!");
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      set({ authUser: response.data.data });
      toast.success("User logged in successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  googleAuth: async (token) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/google", { token });
      set({
        authUser: response.data.data,
      });
      toast.success("User logged in successfully via Google!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during Google authentication.";
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  logoutUser: async () => {
    set({
      isLoading: true,
    });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("User logged out successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during logout.";
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  getUserProfile: async () => {
    const { authUser } = useAuthStore.getState();

    if (!authUser || !authUser.id) {
      toast.error("User is not authenticated. Please log in.");
      return;
    }

    set({ isLoading: true });

    try {
      const response = await axiosInstance.get(`/auth/profile/${authUser.id}`);
      set({ authUser: response.data.data || response.data });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching user profile.";
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));
