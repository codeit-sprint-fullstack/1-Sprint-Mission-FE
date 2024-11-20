// 기본 타입 정의
export type HttpStatusType = number | undefined;
export type ExceptionCodeType = string | undefined;
export type ExceptionIdentifierType = string;

// 공통 예외 매개변수 인터페이스
export interface ExceptionParams {
  status?: HttpStatusType;
  code?: ExceptionCodeType;
  message?: string;
  identifier?: ExceptionIdentifierType;
  subCode?: number | null;
  reason?: string;
  origin?: unknown;
  occurredAt?: string;
}

// 에러 응답 인터페이스
export interface ErrorResponse {
  status: HttpStatusType;
  code: ExceptionCodeType;
  message: string;
  identifier?: ExceptionIdentifierType;
  subCode?: number | undefined | null;
  reason?: string;
  occurredAt: string;
}

// CommonException의 JSON 반환 타입 - type alias로 변경
export type CommonExceptionJSON = ErrorResponse;
