type ApiCallFunction<T> = () => Promise<T>;

export default async function apiHandler<T>(
  apiCall: ApiCallFunction<T>
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    throw error;
  }
}
