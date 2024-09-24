import { communityApi } from "./clients";
import { handleApiError } from "./apiErrorHandler";
import { POSTS_PER_PAGE } from "@/constants/pagination";

export const fetchPosts = async (
  pageParam = 0,
  sort = "latest",
  search = ""
) => {
  try {
    const { data } = await communityApi.get(`/api/community/posts`, {
      params: { page: pageParam, sort, search, limit: POSTS_PER_PAGE },
    });
    return {
      posts: data.posts,
      nextPage: data.hasNextPage ? pageParam + 1 : null,
      totalPages: data.totalPages,
    };
  } catch (error) {
    handleApiError(error);
  }
};

export const createPost = async ({ title, content }) => {
  try {
    const { data } = await communityApi.post("/api/community/posts", {
      title,
      content,
      author_name: "익명의 판다",
    });
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchPost = async (postId) => {
  try {
    const { data } = await communityApi.get(`/api/community/posts/${postId}`);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchComments = async (postId) => {
  try {
    const { data } = await communityApi.get(
      `/api/community/posts/${postId}/comments`
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const postComment = async ({ postId, content }) => {
  try {
    const { data } = await communityApi.post(
      `/api/community/posts/${postId}/comments`,
      {
        content,
        author_name: "익명의 판다",
      }
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePost = async ({ id, title, content }) => {
  try {
    const { data } = await communityApi.patch(`/api/community/posts/${id}`, {
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
    await communityApi.delete(`/api/community/posts/${id}`);
    return true;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateComment = async ({ postId, commentId, content }) => {
  try {
    const { data } = await communityApi.patch(
      `/api/community/posts/${postId}/comments/${commentId}`,
      { content }
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteComment = async ({ postId, commentId }) => {
  try {
    await communityApi.delete(
      `/api/community/posts/${postId}/comments/${commentId}`
    );
    return true;
  } catch (error) {
    handleApiError(error);
  }
};
