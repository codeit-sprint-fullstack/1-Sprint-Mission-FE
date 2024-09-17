import { create } from 'zustand';

export const useCommentContentStore = create((set) => ({
  content: '',
  setContent: (state) => set(() => ({ content: state })),
}));
