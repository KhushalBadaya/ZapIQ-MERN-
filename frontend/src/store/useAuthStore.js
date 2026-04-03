// check user check login signup logout
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

import toast from "react-hot-toast";
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in AuthCheck : ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.get("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
<<<<<<< Updated upstream
      const res = axiosInstance.get("/auth/login", data);
=======
      const res = await axiosInstance.post("/auth/login", data);
>>>>>>> Stashed changes
      set({ authUser: res.data });
      toast.success("Logged in  Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, onlineUsers: [] }); // ← clear both
      toast.success("Logout Successfully");
    } catch (error) {
      console.log("Error Logging Out :", error);
    }
  },
}));
