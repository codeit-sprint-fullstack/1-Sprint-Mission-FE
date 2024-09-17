import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors";
import { handleError } from "@/utils/handleError";
import { getCommentById, updateComment, deleteComment } from "@/data/postData";

export default async function handler(req, res) {
  const { postId, commentId } = req.query;

  if (
    !postId ||
    !commentId ||
    isNaN(Number(postId)) ||
    isNaN(Number(commentId))
  ) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: "올바른 postId와 commentId가 필요합니다.",
    });
  }

  try {
    switch (req.method) {
      case "GET":
        return await handleGetComment(Number(postId), Number(commentId), res);
      case "PATCH":
        return await handleUpdateComment(
          Number(postId),
          Number(commentId),
          req.body,
          res
        );
      case "DELETE":
        return await handleDeleteComment(
          Number(postId),
          Number(commentId),
          res
        );
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        throw new CommonException({
          status: HttpStatus.METHOD_NOT_ALLOWED,
          message: `${req.method} 메소드는 사용할 수 없습니다`,
          code: ExceptionCode.BUSINESS_LOGIC_ERROR,
        });
    }
  } catch (error) {
    console.error("API 에러:", error);
    handleError(res, error);
  }
}

async function handleGetComment(postId, commentId, res) {
  const comment = await getCommentById(postId, commentId);
  return res.status(HttpStatus.OK).json(comment);
}

async function handleUpdateComment(postId, commentId, body, res) {
  console.log("Request Body:", body);
  const { content } = body;

  if (!content) {
    throw new CommonException({
      status: HttpStatus.BAD_REQUEST,
      message: "댓글 내용이 필요합니다.",
      code: ExceptionCode.INVALID_INPUT,
    });
  }

  const updatedComment = await updateComment(postId, commentId, content);
  return res.status(HttpStatus.OK).json(updatedComment);
}

async function handleDeleteComment(postId, commentId, res) {
  await deleteComment(postId, commentId);
  return res.status(HttpStatus.NO_CONTENT).end();
}
