import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors";
import { handleApiError } from "@utils/apiErrorHandler";
import {
  getCommentById,
  updateComment,
  deleteComment,
} from "@/data/commentData";

export default async function handler(req, res) {
  const { articleId, commentId } = req.query;

  if (
    !articleId ||
    !commentId ||
    isNaN(Number(articleId)) ||
    isNaN(Number(commentId))
  ) {
    res.status(HttpStatus.BAD_REQUEST).json({
      error: "올바른 articleId와 commentId가 필요합니다.",
    });
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        await handleGetComment(Number(articleId), Number(commentId), res);
        break;
      case "PATCH":
        await handleUpdateComment(
          Number(articleId),
          Number(commentId),
          req.body,
          res
        );
        break;
      case "DELETE":
        await handleDeleteComment(Number(articleId), Number(commentId), res);
        break;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
          error: `${req.method} 메소드는 사용할 수 없습니다`,
        });
    }
  } catch (error) {
    console.error("API 에러:", error);
    handleApiError(res, error);
  }
}

async function handleGetComment(articleId, commentId, res) {
  const comment = await getCommentById(articleId, commentId);
  res.status(HttpStatus.OK).json(comment);
}

async function handleUpdateComment(articleId, commentId, body, res) {
  const { content } = body;

  if (!content) {
    res.status(HttpStatus.BAD_REQUEST).json({
      error: "댓글 내용이 필요합니다.",
    });
    return;
  }

  try {
    const updatedComment = await updateComment(articleId, commentId, content);
    res.status(HttpStatus.OK).json(updatedComment);
  } catch (error) {
    if (error instanceof NotFoundException) {
      res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
    } else {
      throw error;
    }
  }
}

async function handleDeleteComment(articleId, commentId, res) {
  try {
    await deleteComment(articleId, commentId);
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (error) {
    if (error instanceof NotFoundException) {
      res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
    } else {
      throw error;
    }
  }
}
