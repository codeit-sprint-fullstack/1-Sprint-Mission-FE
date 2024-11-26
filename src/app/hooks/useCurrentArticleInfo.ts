import { create } from "zustand";

import { CurrentPostInfoState } from "src/types/hook";

export const useCurrentPostInfo = create<CurrentPostInfoState>((set) => ({
  id: "postId",
  name: "post-name",
  content: "post-content",
  modifyPostId: (newPostId) => set({ id: newPostId }),
  setName: (newPostName) => set({ name: newPostName }),
  setContent: (newPostContent) => set({ content: newPostContent }),
}));

export default useCurrentPostInfo;
