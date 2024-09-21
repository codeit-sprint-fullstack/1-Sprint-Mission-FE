import { toast } from "react-toastify";

export async function apiHandler(requestFunction, ...args) {
  try {
    const response = await requestFunction(...args);
    return response;
  } catch (error) {
    toast.error("요청을 실패했습니다. 잠시 후 다시 시도해주세요.");
    console.error("API 호출 실패:", error);
    throw error;
  }
}
