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

export async function addFavorite(productId) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${baseUrl}/products/${productId}/favorite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }

  return response.json();
}

export async function removeFavorite(productId) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${baseUrl}/products/${productId}/favorite`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove favorite");
  }

  return response.json();
}
