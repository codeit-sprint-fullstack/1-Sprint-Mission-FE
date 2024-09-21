// productApi.js
export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?pageSize=${pageSize}&page=${page}&keyword=${keyword}&orderBy=${orderBy}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}
