const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProducts(page) {
  const response = await fetch(
    `${BASE_URL}/products?page=${page}&pageSize=10&orderBy=recent`
  );
  const data = await response.json();
  return data;
}

export async function getProductDetail(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
}

export async function getProductComment(id) {
  const response = await fetch(`${BASE_URL}/products/${id}/comments?limit=10`);
  const data = await response.json();
  return data;
}

export async function getArticles() {
  const response = await fetch(
    `${BASE_URL}/articles?page=1&pageSize=10&orderBy=recent`
  );
  const data = await response.json();
  return data;
}

export async function getArticleComment(id) {
  const response = await fetch(`${BASE_URL}/articles/${id}/comments?limit=10`);
  const data = await response.json();
  return data;
}

export async function getArticle(id) {
  const response = await fetch(`${BASE_URL}/articles/${id}`);
  const data = await response.json();
  return data;
}
