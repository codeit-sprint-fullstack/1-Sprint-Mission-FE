import { create } from "zustand";

const useAuth = create((set) => ({
  isSignedIn: false,
  login: () => set({ isSignedIn: true }),
  logout: () => set({ isSignedIn: false }),
}));

export default useAuth;
