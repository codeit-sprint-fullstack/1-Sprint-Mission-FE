const API_URL = process.env.NEXT_PUBLIC_API_URL;
const POSTS_PER_PAGE = 3;

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message;
    } catch {
      errorMessage = "요청 처리 중 오류가 발생했습니다.";
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const fetchPosts = async (pageParam = 0) => {
  const response = await fetch(
    `${API_URL}/api/community/posts?page=${pageParam}&limit=${POSTS_PER_PAGE}`
  );
  const data = await handleResponse(response);
  return {
    posts: data.posts,
    nextPage: data.hasNextPage ? pageParam + 1 : null,
    totalPages: data.totalPages,
  };
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
