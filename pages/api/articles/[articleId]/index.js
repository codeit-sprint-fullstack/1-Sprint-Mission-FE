import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors";
import { handleApiError } from "@/utils/apiErrorHandler";
import { getArticleById, updatePost, deletePost } from "@/data/postArticle";

export default async function handler(req, res) {
  try {
    const { articleId } = req.query;

    switch (req.method) {
      case "GET":
        const post = await getArticleById(articleId);
        res.status(HttpStatus.OK).json(post);
        break;

      case "PATCH":
        const { title, content } = req.body;
        if (!title || !content) {
          throw new CommonException({
            status: HttpStatus.BAD_REQUEST,
            message: "제목과 내용을 모두 입력해야 합니다.",
            code: ExceptionCode.INVALID_INPUT,
          });
        }
        const updatedPost = await updatePost(articleId, { title, content });
        res.status(HttpStatus.OK).json(updatedPost);
        break;

      case "DELETE":
        await deletePost(articleId);
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
    handleApiError(res, error);
  }
}
