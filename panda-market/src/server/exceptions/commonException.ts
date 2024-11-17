import { HttpStatus, ExceptionCode } from "./constants";
import type {
  ExceptionParams,
  HttpStatusType,
  ExceptionCodeType,
  ExceptionIdentifierType,
  CommonExceptionJSON,
} from "./types";

export class CommonException extends Error {
  public status: HttpStatusType;
  public code: ExceptionCodeType;
  public subCode?: number | null;
  public identifier?: ExceptionIdentifierType;
  public reason?: string;
  public origin?: unknown;
  public occurredAt: string;

  constructor({
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    code = ExceptionCode.BUSINESS_LOGIC_ERROR,
    message = "예상 외 에러가 발생했습니다",
    identifier,
    subCode,
    reason,
    origin,
    occurredAt = new Date().toISOString(),
  }: ExceptionParams = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.subCode = subCode ?? null;
    this.identifier = identifier;
    this.reason = reason;
    this.origin = origin;
    this.occurredAt = occurredAt;
    Error.captureStackTrace(this, this.constructor);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON(): CommonExceptionJSON {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      identifier: this.identifier,
      subCode: this.subCode,
      reason: this.reason,
      occurredAt: this.occurredAt,
    };
  }
}
