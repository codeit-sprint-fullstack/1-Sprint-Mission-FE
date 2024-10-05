import { productApi } from "./clients";
import { handleApiError } from "./apiErrorHandler";

export const getComments = async (articleId, cursor = 0, limit) => {
  try {
    const response = await productApi.get(`/articles/${articleId}/comments`, {
      params: { limit, cursor },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export async function addComment(entityId, commentData, entityType) {
  console.log(
    "댓글추:",
    JSON.stringify({ entityId, commentData, entityType }, null, 2)
  );

  const writerId = Number(commentData.userId);

  if (isNaN(writerId) || writerId <= 0) {
    throw new Error("Invalid user ID");
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: commentData.content,
        ...(entityType === "article"
          ? { article: { connect: { id: Number(entityId) } } }
          : { product: { connect: { id: Number(entityId) } } }),
        writer: { connect: { id: writerId } },
      },
      include: { writer: true },
    });

    console.log("댓글생성:", JSON.stringify(newComment, null, 2));
    return newComment;
  } catch (error) {
    console.error("Error in addComment:", error);
    throw error;
  }
}

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
