import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors";
import { getCommentById, updateComment, deleteComment } from "@/data/postData";
import { handleError } from "@/utils/handleError";

export default async function handler(req, res) {
  try {
    const { postId, commentId } = req.query;

    switch (req.method) {
      case "GET":
        const comment = await getCommentById(postId, commentId);
        if (!comment) {
          throw new NotFoundException("댓글을 찾을 수 없습니다.");
        }
        res.status(HttpStatus.OK).json(comment);
        break;
      case "PATCH":
        const updatedComment = await updateComment(postId, commentId, req.body);
        if (!updatedComment) {
          throw new NotFoundException("댓글을 찾을 수 없습니다.");
        }
        res.status(HttpStatus.OK).json(updatedComment);
        break;
      case "DELETE":
        const deleted = await deleteComment(postId, commentId);
        if (!deleted) {
          throw new NotFoundException("댓글을 찾을 수 없습니다.");
        }
        res.status(HttpStatus.NO_CONTENT).end();
        break;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        throw new CommonException({
          status: HttpStatus.METHOD_NOT_ALLOWED,
          message: `${req.method} 는 사용할 수 없습니다`,
          code: ExceptionCode.BUSINESS_LOGIC_ERROR,
        });
    }
  } catch (error) {
    handleError(res, error);
  }
}
