import {
  BadRequestException,
  UnauthorizedException,
} from "@/errors/CustomExceptions";
import {
  HttpStatus,
  ExceptionCode,
  ExceptionIdentifier,
  CommonException,
} from "@/errors/index";
import { handleApiError } from "@utils/apiErrorHandler";
import {
  getArticles,
  getTotalArticlesCount,
  addArticle,
} from "@/data/postArticle";
import { isAuthenticated, getUserInfo } from "@/utils/auth";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        await handleGetRequest(req, res);
        break;
      case "POST":
        await handlePostRequest(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        throw new CommonException({
          status: HttpStatus.METHOD_NOT_ALLOWED,
          code: ExceptionCode.BUSINESS_LOGIC_ERROR,
          message: `${req.method} 는 사용할 수 없습니다`,
          identifier: ExceptionIdentifier.INPUT_ERROR,
          origin: "handler",
          reason: "허용되지 않은 HTTP 메소드",
        });
    }
  } catch (error) {
    handleApiError(error, res);
  }
}

async function handleGetRequest(req, res) {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    if (isNaN(page) || isNaN(limit) || page < 0 || limit < 1 || limit > 100) {
      throw new BadRequestException("잘못된 페이지 또는 한계값입니다.");
    }

    const [articles, totalCount] = await Promise.all([
      getArticles(page, limit),
      getTotalArticlesCount(),
    ]);

    res.status(HttpStatus.OK).json({
      articles,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: (page + 1) * limit < totalCount,
    });
  } catch (error) {
    if (error instanceof CommonException) {
      throw error;
    }
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.BUSINESS_LOGIC_ERROR,
      message: "게시글 데이터를 가져오는 중 오류가 발생했습니다.",
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "handleGetRequest",
      reason: error.message,
    });
  }
}

async function handlePostRequest(req, res) {
  try {
    if (!isAuthenticated(req)) {
      throw new UnauthorizedException("인증되지 않은 사용자입니다.");
    }

    const user = await getUserInfo(req);
    const { title, content } = req.body;

    if (!title || !content) {
      throw new BadRequestException(
        "게시글 제목과 내용을 모두 입력해야 합니다."
      );
    }

    if (typeof title !== "string" || typeof content !== "string") {
      throw new BadRequestException(
        "게시글 제목과 내용은 문자열이어야 합니다."
      );
    }

    if (title.length > 100 || content.length > 10000) {
      throw new BadRequestException("제목 또는 내용이 너무 깁니다.");
    }

    const newPost = await addArticle({ title, content, userId: user.id });
    res.status(HttpStatus.CREATED).json(newPost);
  } catch (error) {
    if (error instanceof CommonException) {
      throw error;
    }
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.BUSINESS_LOGIC_ERROR,
      message: "게시글을 추가하는 중 오류가 발생했습니다.",
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "handlePostRequest",
      reason: error.message,
    });
  }
}
