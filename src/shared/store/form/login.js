import { create } from 'zustand';

export const useLoginStore = create((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set(() => ({ email })),
  setPassword: (password) => set(() => ({ password })),
}));
