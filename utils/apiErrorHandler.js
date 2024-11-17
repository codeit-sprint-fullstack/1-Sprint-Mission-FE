import axios from "axios";
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  UnprocessableEntityException,
  RateLimitExceededException,
  InternalServerErrorException,
  NetworkErrorException,
} from "@/errors/CustomExceptions";

export const handleApiError = (error) => {
  console.error("Full error object:", error);

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "요청 처리 중 오류가 발생했습니다.";
    const errorCode = error.response?.data?.code;

    if (error.message === "Network Error") {
      throw new NetworkErrorException(
        "네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요."
      );
    }

    switch (status) {
      case 400:
        throw new BadRequestException(`잘못된 요청입니다: ${message}`);
      case 401:
        throw new UnauthorizedException(`인증에 실패했습니다: ${message}`);
      case 403:
        throw new ForbiddenException(`접근 권한이 없습니다: ${message}`);
      case 404:
        throw new NotFoundException(
          `요청한 리소스를 찾을 수 없습니다: ${message}`
        );
      case 409:
        throw new ConflictException(`데이터 충돌이 발생했습니다: ${message}`);
      case 422:
        throw new UnprocessableEntityException(
          `데이터 처리에 실패했습니다: ${message}`
        );
      case 429:
        throw new RateLimitExceededException(
          `요청이 너무 많습니다. 잠시 후 다시 시도해주세요: ${message}`
        );
      default:
        if (status >= 500) {
          throw new InternalServerErrorException(
            `서버 오류가 발생했습니다. 나중에 다시 시도해주세요. (오류 코드: ${
              errorCode || status
            })`
          );
        } else if (status >= 400) {
          throw new BadRequestException(
            `클라이언트 요청 오류가 발생했습니다. (오류 코드: ${
              errorCode || status
            }, 메시지: ${message})`
          );
        } else {
          throw new Error(
            `알 수 없는 오류가 발생했습니다. (상태 코드: ${status}, 메시지: ${message})`
          );
        }
    }
  } else {
    throw new Error(`예상 외 오류가 발생했습니다: ${error.message}`);
  }
};
