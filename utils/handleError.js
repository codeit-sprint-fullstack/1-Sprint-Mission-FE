import { CommonException, HttpStatus, ExceptionIdentifier } from "../errors";

export function handleError(res, error) {
  console.error("Error details:", {
    name: error.name,
    message: error.message,
    stack: error.stack,
    isCommonException: error instanceof CommonException,
  });

  if (error instanceof CommonException) {
    console.log("Handling CommonException");
    res.status(error.status).json({
      message: error.message,
      code: error.code,
      identifier: error.identifier,
      reason: error.reason,
      origin: error.origin,
      occuredAt: error.occuredAt,
    });
  } else {
    console.log("Handling unknown error");
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "예상 외 에러가 발생했습니다",
      code: "UNKNOWN_ERROR",
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      occuredAt: new Date().toISOString(),
    });
  }
}
