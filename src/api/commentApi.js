import axios from "axios";

const baseUrl = "https://panda-market-api.vercel.app";

// 상품에 댓글 추가
export const createComment = async (productId, content, accessToken) => {
  const response = await axios({
    method: "post",
    url: `${baseUrl}/products/${productId}/comments`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      content: content,
    },
  });
  return response.data;
};

// 상품의 댓글 목록 조회
export const getComments = async (productId, limit = 10, cursor = 0) => {
  const response = await axios({
    method: "get",
    url: `${baseUrl}/products/${productId}/comments`,
    params: {
      limit: limit,
      cursor: cursor,
    },
  });
  return response.data;
};

// 댓글 수정
export const updateComment = async (commentId, content, accessToken) => {
  const response = await axios({
    method: "patch",
    url: `${baseUrl}/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      content: content,
    },
  });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId, accessToken) => {
  const response = await axios({
    method: "delete",
    url: `${baseUrl}/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

