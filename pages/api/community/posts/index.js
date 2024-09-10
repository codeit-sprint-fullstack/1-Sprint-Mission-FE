import {
  BadRequestException,
  CommonException,
  HttpStatus,
  ExceptionCode,
} from "../../../../errors/CustomExceptions";
import { getPosts, addPost } from "../../../../data/postData";
import { handleError } from "../../../../utils/handleError";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const posts = await getPosts();
        res.status(HttpStatus.OK).json(posts);
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
