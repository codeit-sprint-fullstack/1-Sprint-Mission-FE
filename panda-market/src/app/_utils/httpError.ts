import { HTTP_STATUS } from "@/app/_constants/http";

type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

const HTTP_ERROR_MESSAGES: Record<HttpStatus, string> = {
  [HTTP_STATUS.BAD_REQUEST]: "입력하신 정보를 다시 확인해주세요.",
  [HTTP_STATUS.UNAUTHORIZED]: "인증에 실패했습니다.",
  [HTTP_STATUS.FORBIDDEN]: "접근 권한이 없습니다.",
  [HTTP_STATUS.NOT_FOUND]: "요청하신 정보를 찾을 수 없습니다.",
  [HTTP_STATUS.CONFLICT]: "이미 존재하는 데이터입니다.",
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: "입력하신 데이터가 유효하지 않습니다.",
  [HTTP_STATUS.TOO_MANY_REQUESTS]: "잠시 후 다시 시도해주세요.",
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]:
    "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export function getHttpErrorMessage(status: number): string {
  return (
    HTTP_ERROR_MESSAGES[status as HttpStatus] ||
    "예상치 못한 오류가 발생했습니다."
  );
}
