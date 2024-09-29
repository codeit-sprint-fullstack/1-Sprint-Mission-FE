export default async function apiHandler(apiCall) {
  try {
    return await apiCall();
  } catch (error) {
    throw error;
  }
}
