const baseUrl = "https://panda-market-api.vercel.app";

export async function getProducts({
  order = "",
  keyword = "",
  page = 1,
  pagesize = 10,
}) {
  const query = `page=${page}&pageSize=${pagesize}&orderBy=${order}&keyword=${keyword}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  if (!response.ok) {
    throw new Error("상품리스트를 불러오지 못 했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function getProduct(id) {
  const response = await fetch(`${baseUrl}/products/${id}`);
  if (!response.ok) {
    throw new Error("상품을 불러오지 못 했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function updateProduct(id, item) {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: "PATCH",
    body: item,
  });
  if (!response.ok) {
    throw new Error("상품 수정에 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function createProduct(item) {
  const response = await fetch(`${baseUrl}/products/`, {
    method: "POST",
    body: item,
  });
  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function createFavoriteProduct(id, item) {
  const response = await fetch(`${baseUrl}/products/${id}/favorite`, {
    method: "POST",
    body: item,
  });
  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다.");
  }
  const data = await response.json();
  return data;
}
