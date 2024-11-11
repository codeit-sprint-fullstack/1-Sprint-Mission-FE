import { create } from "zustand";

export const useCurrentPostInfo = create((set) => ({
  id: "postId",
  name: "post-name",
  content: "post-content",
  modifyPostId: (newPostId) => set({ id: newPostId }),
  setName: (newPostName) => set({ name: newPostName }),
  setContent: (newPostContent) => set({ content: newPostContent }),
}));

export default useCurrentPostInfo;
