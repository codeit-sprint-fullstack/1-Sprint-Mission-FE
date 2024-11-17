
import { communityApi } from "./clients";
import { handleApiError } from "./apiErrorHandler";
import { POSTS_PER_PAGE } from "@/constants/pagination";

export const fetchPosts = async (
  pageParam = 0,
  sort = "latest",
  search = ""
) => {
  const response = await fetch(
    `${API_URL}/api/community/posts?page=${pageParam}&sort=${sort}&search=${search}&limit=${POSTS_PER_PAGE}`
  );
  if (!response.ok) {
    throw new Error("게시글 조회를 실패했습니다");
  }
  const data = await response.json();
  return {
    posts: data.posts,
    nextPage: data.hasNextPage ? pageParam + 1 : null,
    totalPages: data.totalPages,
  };
};

export const createPost = async ({ title, content }) => {
  const response = await fetch(`${API_URL}/api/community/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, author_name: "익명의 판다" }),
  });
  return handleResponse(response);
};

export const fetchPost = async (postId) => {
  const response = await fetch(`${API_URL}/api/community/posts/${postId}`);
  return handleResponse(response);
};

export const fetchComments = async (postId) => {
  const response = await fetch(
    `${API_URL}/api/community/posts/${postId}/comments`
  );
  return handleResponse(response);
};

export const postComment = async ({ postId, content }) => {
  const response = await fetch(
    `${API_URL}/api/community/posts/${postId}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, author_name: "익명의 판다" }),
    }
  );
  return handleResponse(response);
};

export const updatePost = async ({ id, title, content }) => {
  const response = await fetch(`${API_URL}/api/community/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(response);
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/api/community/posts/${id}`, {
    method: "DELETE",
  });
  await handleResponse(response);
  return true;
};

export const updateComment = async ({ postId, commentId, content }) => {
  const response = await fetch(
    `${API_URL}/api/community/posts/${postId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }
  );
  return handleResponse(response);
};

export const deleteComment = async ({ postId, commentId }) => {
  const response = await fetch(
    `${API_URL}/api/community/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );
  await handleResponse(response);
  return true;
};
