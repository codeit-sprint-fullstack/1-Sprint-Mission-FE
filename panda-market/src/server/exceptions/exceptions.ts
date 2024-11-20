import { CommonException } from "./commonException";
import { HttpStatus, ExceptionCode, ExceptionIdentifier } from "./constants";

export class NotFoundException extends CommonException {
  constructor(message = "해당 리소스를 찾을 수 없습니다") {
    super({
      status: HttpStatus.NOT_FOUND,
      code: ExceptionCode.RESOURCE_NOT_FOUND,
      message,
      identifier: ExceptionIdentifier.RESOURCE_ERROR,
    });
  }
}

export class BadRequestException extends CommonException {
  constructor(message = "잘못된 요청입니다") {
    super({
      status: HttpStatus.BAD_REQUEST,
      code: ExceptionCode.VALIDATION_ERROR,
      message,
      identifier: ExceptionIdentifier.INPUT_ERROR,
    });
  }
}

export class UnauthorizedException extends CommonException {
  constructor(
    message = "인증되지 않은 사용자입니다",
    subCode: number | null = null,
  ) {
    super({
      status: HttpStatus.UNAUTHORIZED,
      code: ExceptionCode.AUTHENTICATION_ERROR,
      message,
      identifier: ExceptionIdentifier.AUTHENTICATION_ERROR,
      subCode: subCode ?? undefined,
    });
  }

  static tokenExpired(
    message = "토큰이 만료되었습니다",
  ): UnauthorizedException {
    return new UnauthorizedException(message, 1);
  }

  static invalidToken(
    message = "유효하지 않은 토큰입니다",
  ): UnauthorizedException {
    return new UnauthorizedException(message, 2);
  }

  static missingToken(
    message = "토큰이 제공되지 않았습니다",
  ): UnauthorizedException {
    return new UnauthorizedException(message, 3);
  }
}

export class ForbiddenException extends CommonException {
  constructor(message = "권한이 없습니다") {
    super({
      status: HttpStatus.FORBIDDEN,
      code: ExceptionCode.PERMISSION_DENIED,
      message,
      identifier: ExceptionIdentifier.AUTHORIZATION_ERROR,
    });
  }
}

export class NotAllowedMethodException extends CommonException {
  constructor(message = "허용되지 않은 메소드입니다") {
    super({
      status: HttpStatus.METHOD_NOT_ALLOWED,
      code: ExceptionCode.METHOD_NOT_ALLOWED,
      message,
      identifier: ExceptionIdentifier.METHOD_NOT_ALLOWED,
    });
  }
}

export class ConflictException extends CommonException {
  constructor(message = "데이터 충돌") {
    super({
      status: HttpStatus.CONFLICT,
      code: ExceptionCode.BUSINESS_LOGIC_ERROR,
      message,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
    });
  }
}

export class UnprocessableEntityException extends CommonException {
  constructor(message = "이행할 수 없는 요청입니다") {
    super({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: ExceptionCode.DATA_INTEGRITY_ERROR,
      message,
      identifier: ExceptionIdentifier.INPUT_ERROR,
    });
  }
}

export class RateLimitExceededException extends CommonException {
  constructor(message = "요청량이 너무 많습니다") {
    super({
      status: HttpStatus.TOO_MANY_REQUESTS,
      code: ExceptionCode.RATE_LIMIT_EXCEEDED,
      message,
      identifier: ExceptionIdentifier.PERFORMANCE_ERROR,
    });
  }
}

export class InternalServerErrorException extends CommonException {
  constructor(message = "서버 내부 에러입니다") {
    super({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.BUSINESS_LOGIC_ERROR,
      message,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
    });
  }
}
