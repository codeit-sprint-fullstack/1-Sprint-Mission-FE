import apiClient from "./apiClient";
import { Comment } from "@/types/Types";

interface FetchCommentsResponse {
  list: Comment[];
  nextCursor: number | null;
}

export async function fetchComments(
  id: number,
  cursor: number | null = null
): Promise<FetchCommentsResponse> {
  try {
    const response = await apiClient.get(`/articles/${id}/comments`, {
      params: { cursor },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch comments");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

// 댓글 삭제
export async function deleteComments(id: number): Promise<void> {
  try {
    const response = await apiClient.delete(`/comments/${id}`);

    if (response.status !== 204) {
      throw new Error("Failed to delete comments");
    }

    return;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

// 댓글 생성
interface CommentFormData {
  content: string;
}

export async function createComments(
  id: number,
  formData: CommentFormData
): Promise<Comment> {
  try {
    const response = await apiClient.post(`/articles/${id}/comments`, formData);

    if (response.status !== 201) {
      throw new Error("Failed to create comments");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

// 댓글 수정
export async function updateComments(
  id: number,
  formData: CommentFormData
): Promise<Comment> {
  try {
    const response = await apiClient.patch(`/comments/${id}`, formData);

    if (response.status !== 200) {
      throw new Error("Failed to update comments");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}
