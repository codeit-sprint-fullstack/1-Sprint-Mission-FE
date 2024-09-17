import { create } from 'zustand';

export const usePostArticleStore = create((set) => ({
  title: '',
  content: '',
  setTitle: (state) => set(() => ({ title: state })),
  setContent: (state) => set(() => ({ content: state })),
}));

export const usePatchArticleStore = create((set) => ({
  title: '',
  content: '',
  setTitle: (state) => set(() => ({ title: state })),
  setContent: (state) => set(() => ({ content: state })),
}));
