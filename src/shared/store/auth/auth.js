import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  login: ({ user }) =>
    set({
      user,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  update: ({ user }) =>
    set({
      user,
      isLoggedIn: false,
    }),
}));
