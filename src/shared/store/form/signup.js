import { create } from 'zustand';

export const useSignupStore = create((set) => ({
  email: '',
  nickname: '',
  password: '',
  passwordConfirmation: '',
  setEmail: (email) => set(() => ({ email })),
  setNickname: (nickname) => set(() => ({ nickname })),
  setPassword: (password) => set(() => ({ password })),
  setPasswordConfirmation: (passwordConfirmation) =>
    set(() => ({ passwordConfirmation })),
}));
