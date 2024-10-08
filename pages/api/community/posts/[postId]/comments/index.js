import {
  BadRequestException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors";
import { handleError } from "@utils/apiErrorHandler";
import { getCommentsByPostId, addComment } from "@/data/postData";

export default async function handler(req, res) {
  try {
    const { postId } = req.query;

    switch (req.method) {
      case "GET":
        const comments = await getCommentsByPostId(postId);
        res.status(HttpStatus.OK).json(comments);
        break;

      case "POST":
        if (!req.body.content) {
          throw new BadRequestException("댓글 내용을 입력해야 합니다.");
        }
        const newComment = await addComment(postId, req.body);
        res.status(HttpStatus.CREATED).json(newComment);
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
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
