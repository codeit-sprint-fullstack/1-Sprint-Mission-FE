export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  const baseUrl = "https://panda-market-api.vercel.app";
  const response = await fetch(
    `${baseUrl}/products?pageSize=${pageSize}&page=${page}&keyword=${keyword}&orderBy=${orderBy}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}
