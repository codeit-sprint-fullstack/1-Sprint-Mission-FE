const baseUrl = "https://panda-market-api.vercel.app";
export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  const response = await fetch(
    `${baseUrl}/products?pageSize=${pageSize}&page=${page}&keyword=${keyword}&orderBy=${orderBy}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}

export async function fetchProduct(id) {
  const response = await fetch(`${baseUrl}/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data;
}
