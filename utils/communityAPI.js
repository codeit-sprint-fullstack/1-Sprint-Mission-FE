import { communityApi } from "./clients";
import { handleApiError } from "./apiErrorHandler";
import { Articles_PER_PAGE } from "@/constants/pagination";

export const fetchArticles = async (
  pageParam = 0,
  sort = "latest",
  search = ""
) => {
  try {
    const { data } = await communityApi.get(`/api/articles`, {
      params: { page: pageParam, sort, search, limit: Articles_PER_PAGE },
    });
    return {
      articles: data.articles,
      nextPage: data.hasNextPage ? pageParam + 1 : null,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      totalCount: data.totalCount,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const createPost = async ({ title, content }) => {
  try {
    const { data } = await communityApi.post("/api/articles", {
      title,
      content,
      author_name: "익명의 판다",
    });
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchPost = async (articleId) => {
  try {
    const { data } = await communityApi.get(`/api/articles/${articleId}`);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchComments = async (articleId) => {
  try {
    const { data } = await communityApi.get(
      `/api/articles/${articleId}/comments`
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const postComment = async ({ articleId, content, userId }) => {
  try {
    const { data } = await communityApi.post(
      `/api/articles/${articleId}/comments`,
      {
        content,
        userId,
      }
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePost = async ({ id, title, content }) => {
  try {
    const { data } = await communityApi.patch(`/api/articles/${id}`, {
      title,
      content,
    });
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePost = async (id) => {
  try {
    await communityApi.delete(`/api/articles/${id}`);
    return true;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateComment = async ({ articleId, commentId, content }) => {
  try {
    const { data } = await communityApi.patch(
      `/api/articles/${articleId}/comments/${commentId}`,
      { content }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("댓글을 찾을 수 없습니다:", error.response.data);
    }
    handleApiError(error);
  }
};

export const deleteComment = async ({ articleId, commentId }) => {
  try {
    await communityApi.delete(
      `/api/articles/${articleId}/comments/${commentId}`
    );
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("댓글을 찾을 수 없습니다:", error.response.data);
    }
    handleApiError(error);
  }
};

export const fetchUser = async () => {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
  return response.json();
};
