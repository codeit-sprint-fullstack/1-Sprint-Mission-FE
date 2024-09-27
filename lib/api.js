const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProducts(page) {
  const response = await fetch(
    `${BASE_URL}/products?page=${page}&pageSize=10&orderBy=recent`
  );
  const data = await response.json();
  return data;
}
