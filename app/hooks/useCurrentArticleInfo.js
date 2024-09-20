import { create } from "zustand";

export const useCurrentArticleInfo = create((set) => ({
  id: "articleId",
  title: "article-title",
  content: "article-content",
  setArticleId: (newArticleId) => set({ id: newArticleId }),
  setTitle: (newArticleTitle) => set({ title: newArticleTitle }),
  setContent: (newArticleContent) => set({ content: newArticleContent }),
}));

export default useCurrentArticleInfo;
