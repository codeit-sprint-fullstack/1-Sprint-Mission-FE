import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "@/errors/CustomExceptions";

const prisma = new PrismaClient();

export async function getCommentsByEntityId(entityId, entityType) {
  const comments = await prisma.comment.findMany({
    where: {
      ...(entityType === "article"
        ? { articleId: Number(entityId) }
        : { productId: Number(entityId) }),
    },
    orderBy: { createdAt: "desc" },
    include: { writer: true },
  });
  return comments;
}

export async function addComment(entityId, commentData, entityType) {
  console.log(
    "댓글추가:",
    JSON.stringify({ entityId, commentData, entityType }, null, 2)
  );

  const writerId = Number(commentData.userId);
  const entityIdNumber = Number(entityId);

  if (isNaN(writerId) || writerId <= 0) {
    throw new Error("Invalid user ID");
  }

  if (isNaN(entityIdNumber) || entityIdNumber <= 0) {
    throw new Error("Invalid entity ID");
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: commentData.content,
        writerId: writerId,
        ...(entityType === "article"
          ? { articleId: entityIdNumber }
          : { productId: entityIdNumber }),
      },
      include: { writer: true },
    });

    console.log("댓글:", JSON.stringify(newComment, null, 2));
    return newComment;
  } catch (error) {
    console.error("생성중문제:", error);
    throw error;
  }
}

export async function getCommentsByArticleId(articleId) {
  return prisma.comment.findMany({
    where: { articleId: Number(articleId) },
    orderBy: { createdAt: "desc" },
    include: { writer: true },
  });
}

export async function getCommentByEntityId(entityId, commentId, entityType) {
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
      ...(entityType === "article"
        ? { articleId: Number(entityId) }
        : { productId: Number(entityId) }),
    },
    include: { writer: true },
  });
  if (!comment) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
  return comment;
}

export async function updateComment(articleId, commentId, content) {
  console.log(
    `업데이트: articleId=${articleId}, commentId=${commentId}, content=${content}`
  );

  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
        articleId: articleId,
      },
      data: { content },
      include: { writer: true },
    });

    console.log("업데이트 성공:", updatedComment);
    return updatedComment;
  } catch (error) {
    if (error.code === "P2025") {
      console.error(
        `Comment not found: articleId=${articleId}, commentId=${commentId}`
      );
      throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
    }
    console.error("Error updating comment:", error);
    throw error;
  }
}

export async function deleteComment(articleId, commentId) {
  console.log(`삭제: articleId=${articleId}, commentId=${commentId}`);

  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
        articleId: articleId,
      },
    });

    console.log("삭제성공:", deletedComment);
    return deletedComment;
  } catch (error) {
    if (error.code === "P2025") {
      console.error(
        `Comment not found: articleId=${articleId}, commentId=${commentId}`
      );
      throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
    }
    console.error("Error deleting comment:", error);
    throw error;
  }
}
