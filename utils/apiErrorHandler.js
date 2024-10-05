import { CommonException } from "@/errors";

export const handleApiError = (error, res) => {
  console.error("API Error:", error);

  if (error instanceof CommonException) {
    res.status(error.status).json({
      message: error.message,
      code: error.code,
      identifier: error.identifier,
      reason: error.reason,
      origin: error.origin,
      occuredAt: error.occuredAt,
    });
  } else if (error instanceof Error) {
    res.status(500).json({
      message: error.message || "예상치 못한 오류가 발생했습니다.",
      code: "UNKNOWN_ERROR",
      identifier: "SYSTEM_ERROR",
      reason: "Unhandled exception",
      origin: "handleApiError",
      occuredAt: new Date().toISOString(),
    });
  } else {
    res.status(500).json({
      message: "알 수 없는 오류가 발생했습니다.",
      code: "UNKNOWN_ERROR",
      identifier: "SYSTEM_ERROR",
      reason: "Non-error object thrown",
      origin: "handleApiError",
      occuredAt: new Date().toISOString(),
    });
  }
};
