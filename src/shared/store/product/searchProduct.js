import { create } from 'zustand';

export const useSearchProductStore = create((set) => ({
  search: '',
  setSearch: (state) => set(() => ({ search: state })),
}));
