import {
  BadRequestException,
  CommonException,
} from "@/errors/CustomExceptions";
import { HttpStatus, ExceptionCode } from "@/errors/index";
import { handleApiError } from "@utils/apiErrorHandler";
import {
  getCommentsByArticleId,
  addComment,
  updateComment,
  deleteComment,
} from "@/data/commentData";

export default async function handler(req, res) {
  try {
    const { articleId, commentId } = req.query;

    switch (req.method) {
      case "GET":
        const comments = await getCommentsByArticleId(articleId);
        res.status(HttpStatus.OK).json(comments);
        break;

      case "POST":
        console.log("POST요청:", JSON.stringify(req.body, null, 2));

        if (!req.body.content) {
          throw new BadRequestException("댓글 내용을 입력해야 합니다.");
        }

        const userId = req.body.userId;

        if (!userId) {
          throw new BadRequestException("유저 ID가 필요합니다.");
        }

        const newComment = await addComment(
          articleId,
          {
            content: req.body.content,
            userId: Number(userId),
          },
          "article"
        );

        console.log("댓글:", JSON.stringify(newComment, null, 2));
        res.status(HttpStatus.CREATED).json(newComment);
        break;

      case "PATCH":
        if (!commentId) {
          throw new BadRequestException("댓글 ID가 필요합니다.");
        }
        if (!req.body.content) {
          throw new BadRequestException("수정할 댓글 내용을 입력해야 합니다.");
        }

        const updatedComment = await updateComment(
          articleId,
          commentId,
          req.body.content,
          "article"
        );
        res.status(HttpStatus.OK).json(updatedComment);
        break;

      case "DELETE":
        if (!commentId) {
          throw new BadRequestException("댓글 ID가 필요합니다.");
        }

        await deleteComment(articleId, commentId, "article");
        res.status(HttpStatus.NO_CONTENT).end();
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        throw new CommonException({
          status: HttpStatus.METHOD_NOT_ALLOWED,
          message: `${req.method} 는 사용할 수 없습니다`,
          code: ExceptionCode.BUSINESS_LOGIC_ERROR,
        });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    handleApiError(res, error);
  }
}
