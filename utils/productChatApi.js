import { apiHandler } from "./apiHandler";

const baseUrl = "https://panda-market-api.vercel.app";

export async function fetchComments(id, cursor = 0) {
  return apiHandler(async () => {
    const response = await fetch(
      `${baseUrl}/products/${id}/comments?limit=4&cursor=${cursor}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await response.json();
    return data;
  });
}
