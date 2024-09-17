import { create } from 'zustand';

export const useCommentIdStore = create((set) => ({
  commentId: null,
  setCommentId: (state) => set(() => ({ commentId: state })),
}));
