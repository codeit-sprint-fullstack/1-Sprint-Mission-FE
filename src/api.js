export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
}) {
  const BASE_URL = "https://panda-market-api.vercel.app/products";
  const qeury = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const response = await fetch(`${BASE_URL}?${qeury}`);
  const body = await response.json();
  return body;
}
