import { getUser, postRefreshToken } from '@utils/api/codeit';
import { create } from 'zustand';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; samesite=strict;`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

export const useAuthStore = create((set) => ({
  user: null,

  loadUserFromSession: () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },

  login: ({ user }) => {
    set({
      user,
    });
    sessionStorage.setItem('user', JSON.stringify(user));
  },

  logout: () => {
    set({
      user: null,
    });
    sessionStorage.removeItem('user');
    deleteCookie.remove('accessToken');
    deleteCookie.remove('refreshToken');
  },

  update: ({ user }) =>
    set({
      user,
    }),

  clearUser: () => {
    set({ user: null });
    sessionStorage.removeItem('user');
  },

  checkAuth: async () => {
    let accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    try {
      const user = await getUser({
        Authorization: `Bearer ${accessToken}`,
      });
      sessionStorage.setItem('user', JSON.stringify(user));
      set({ user });
    } catch (error) {
      if (error.response?.status === 401 && refreshToken) {
        try {
          const newAccessToken = await postRefreshToken(refreshToken);
          setCookie('accessToken', newAccessToken, 1);

          const user = await getUser({
            Authorization: `Bearer ${newAccessToken}`,
          });
          sessionStorage.setItem('user', JSON.stringify(user));
          set({ user });
        } catch (error) {
          console.error(error);
          set({ user: null });
          sessionStorage.removeItem('user');
          deleteCookie('refreshToken');
        }
      } else {
        window.location.href = '/login';
      }
    }
  },
}));
