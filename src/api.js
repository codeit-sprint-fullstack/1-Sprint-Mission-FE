const BASE_URL = "https://product-api-shiu.onrender.com/products";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const response = await fetch(`${BASE_URL}?${query}`);
  const body = await response.json();
  return body;
}
