import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "../../../../../errors";
import {
  getPostById,
  updatePost,
  deletePost,
} from "../../../../../data/postData";
import { handleError } from "../../../../../utils/handleError";

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
        const deleteResult = await deletePost(postId);
        if (deleteResult) {
          res.status(HttpStatus.OK).json({
            success: true,
            message: "게시글이 성공적으로 삭제되었습니다.",
            deletedPostId: postId,
          });
        } else {
          throw new NotFoundException("삭제할 게시글을 찾을 수 없습니다.");
        }
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
