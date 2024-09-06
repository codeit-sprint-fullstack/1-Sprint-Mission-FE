export async function fetchArticle(id) {
  const res = await fetch(`https://thrift-shop.onrender.com/articles/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  return res.json();
}

// utils/api.js

export async function fetchArticles({ sort, keyword, offset, size }) {
  const res = await fetch(
    `https://thrift-shop.onrender.com/articles?sort=${sort}&search=${keyword}&offset=${offset}&size=${size}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return data;
}

export async function fetchBestArticles() {
  const res = await fetch(
    `https://thrift-shop.onrender.com/articles?sort=createdAt&offset=0&size=3`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch best articles");
  }

  const data = await res.json();
  return data;
}

export async function updateArticle(id, formData) {
  const res = await fetch(`https://thrift-shop.onrender.com/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to update article");
  }

  return res.json();
}

export async function deleteArticle(id) {
  const res = await fetch(`https://thrift-shop.onrender.com/articles/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete article");
  }
  return res.json();
}

export async function createArticle(formData) {
  try {
    const res = await fetch("https://thrift-shop.onrender.com/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorText = await res.text(); // 에러 텍스트 받기
      console.error("Server error response:", errorText);
      throw new Error("Failed to create article");
    }

    // 응답을 JSON으로 파싱하여 반환
    return await res.json();
  } catch (error) {
    console.error("Error during article creation:", error.message);
    throw error;
  }
}
