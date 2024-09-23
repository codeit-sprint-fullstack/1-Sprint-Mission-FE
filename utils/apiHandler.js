// apiHandler.js
export default async function apiHandler(apiCall) {
  try {
    return await apiCall();
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
}
