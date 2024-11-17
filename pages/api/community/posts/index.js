import {
  BadRequestException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "@/errors";
import { handleError } from "@utils/apiErrorHandler";
import { getPosts, getTotalPostsCount, addPost } from "@/data/postData";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;

        if (isNaN(page) || isNaN(limit) || page < 0 || limit < 1) {
          throw new BadRequestException("잘못된 페이지 또는 한계값입니다.");
        }

        const [posts, totalCount] = await Promise.all([
          getPosts(page, limit),
          getTotalPostsCount(),
        ]);

        res.status(HttpStatus.OK).json({
          posts,
          totalCount,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          hasNextPage: (page + 1) * limit < totalCount,
        });
        break;

      case "POST":
        if (!req.body.title || !req.body.content) {
          throw new BadRequestException(
            "게시글 제목과 내용을 입력해야 합니다."
          );
        }

        const newPost = await addPost(req.body);
        res.status(HttpStatus.CREATED).json(newPost);
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
