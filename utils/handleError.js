import { CommonException, HttpStatus } from "../errors/CustomExceptions";

export function handleError(res, error) {
  if (error instanceof CommonException) {
    res.status(error.status).json({
      message: error.message,
      code: error.code,
      identifier: error.identifier,
      reason: error.reason,
      origin: error.origin,
      occuredAt: error.occuredAt,
    });
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "서버 오류가 발생했습니다.",
    });
  }
}
