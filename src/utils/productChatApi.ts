import apiHandler from "./apiHandler";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./apiEndpoint";
import { Comment } from "@/types/Types";

// 댓글 가져오기
export async function fetchComments(
  id: number | string,
  cursor: number | null = null
): Promise<{ list: Comment[]; nextCursor?: number | null }> {
  const productId = typeof id === "string" ? parseInt(id, 10) : id;
  if (isNaN(productId)) {
    throw new Error(`Invalid ID: ${id}`);
  }

  return apiHandler(async () => {
    const response = await apiClient.get(
      API_ENDPOINTS.PRODUCTS.FETCH_COMMENTS(productId, cursor ?? "")
    );

    // 서버에서 가져온 데이터에서 필요한 부분을 추출하여 반환
    const { list, nextCursor } = response.data;

    return {
      list, // 실제 댓글 리스트
      nextCursor: nextCursor ? parseInt(nextCursor, 10) : null,
    };
  });
}

// 댓글 추가하기
export async function addComment(
  id: number,
  comment: { content: string }
): Promise<Comment> {
  return apiHandler(async () => {
    const response = await apiClient.post(
      API_ENDPOINTS.PRODUCTS.ADD_COMMENT(id),
      comment
    );
    return response.data;
  });
}

// 댓글 수정하기
export async function editComment(
  id: number,
  comment: { content: string }
): Promise<Comment> {
  return apiHandler(async () => {
    const response = await apiClient.patch(
      API_ENDPOINTS.PRODUCTS.DETAIL_COMMENT(id),
      comment
    );
    return response.data;
  });
}

// 댓글 삭제하기
export async function deleteComment(id: number): Promise<void> {
  return apiHandler(async () => {
    await apiClient.delete(API_ENDPOINTS.PRODUCTS.DETAIL_COMMENT(id));
  });
}
