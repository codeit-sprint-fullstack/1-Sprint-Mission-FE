import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors/CustomExceptions";
import { getPostById, updatePost, deletePost } from "@/data/postData";
import { handleError } from "@/utils/handleError";

export default async function handler(req, res) {
  try {
    const { postId } = req.query;

    switch (req.method) {
      case "GET":
        const post = await getPostById(postId);
        if (!post) {
          throw new NotFoundException("게시글을 찾을 수 없습니다.");
        }
        res.status(HttpStatus.OK).json(post);
        break;
      case "PATCH":
        const updatedPost = await updatePost(postId, req.body);
        if (!updatedPost) {
          throw new NotFoundException("게시글을 찾을 수 없습니다.");
        }
        res.status(HttpStatus.OK).json(updatedPost);
        break;
      case "DELETE":
        const wasDeleted = await deletePost(postId);
        if (!wasDeleted) {
          throw new NotFoundException("게시글을 찾을 수 없습니다.");
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
