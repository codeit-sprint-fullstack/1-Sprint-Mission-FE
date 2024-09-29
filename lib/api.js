const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const refreshToken = process.env.NEXT_PUBLIC_REFRESH_TOKEN;
const userId = process.env.NEXT_PUBLIC_USER_ID;

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

export async function signUp(userData) {
  const response = await fetch(`${BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function signIn(userData) {
  const response = await fetch(`${BASE_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", JSON.stringify(data));
    console.log(data);
  }
  return data;
}

export async function createProductComment(id, userData) {
  const response = await fetch(`${BASE_URL}/products/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken,
      "x-user-id": userId,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function deleteProductComment(commentId) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken,
      "x-user-id": userId,
    },
  });

  if (!response.ok) {
    alert("권한이 없습니다");
  } else {
    alert("삭제되었습니다");
    return response.json();
  }
}
