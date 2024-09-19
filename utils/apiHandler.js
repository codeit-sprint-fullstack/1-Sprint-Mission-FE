import { toast } from "react-toastify";

export async function apiHandler(requestFunction, ...args) {
  try {
    const response = await requestFunction(...args);

    // response.ok가 false일 때 오류 처리
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "요청을 실패했습니다. 잠시 후 다시 시도해주세요.";
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    toast.error(
      error.message || "요청을 실패했습니다. 잠시 후 다시 시도해주세요."
    );
    console.error("API 호출 실패:", error);
    throw error;
  }
}
