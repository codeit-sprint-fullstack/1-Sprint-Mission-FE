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
