import axios from "axios";
import { create } from "zustand";

export const useViewProfile = create((set) => ({
  viewedUser: null, // The user profile currently being viewed
  fetchUserProfile: async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      set({ viewedUser: response.data });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  },
}));