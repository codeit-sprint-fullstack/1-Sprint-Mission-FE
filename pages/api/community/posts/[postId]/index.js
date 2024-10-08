import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors";
import { handleError } from "@utils/apiErrorHandler";
import { getPostById, updatePost, deletePost } from "@/data/postData";

export default async function handler(req, res) {
  try {
    const { postId } = req.query;

    switch (req.method) {
      case "GET":
        const post = await getPostById(postId);
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
        const updatedPost = await updatePost(postId, { title, content });
        res.status(HttpStatus.OK).json(updatedPost);
        break;

      case "DELETE":
        await deletePost(postId);
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
    if (error instanceof NotFoundException) {
      handleError(res, error);
    } else {
      handleError(res, error);
    }
  }
}
