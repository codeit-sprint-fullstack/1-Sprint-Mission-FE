import apiHandler from "./apiHandler";

const baseUrl = "https://thrift-shop.onrender.com";

export async function fetchArticle(id) {
  return apiHandler(async () => {
    const res = await fetch(`${baseUrl}/articles/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }
    return res.json();
  });
}

export async function fetchArticles({ sort, keyword, page, size }) {
  return apiHandler(async () => {
    const params = new URLSearchParams({
      sort,
      search: keyword,
      page: page.toString(),
      size: size.toString(),
    });

    const res = await fetch(`${baseUrl}/articles?${params}`);
    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }
    return await res.json();
  });
}

export async function fetchBestArticles(size) {
  return apiHandler(async () => {
    const res = await fetch(`${baseUrl}/articles?sort=createdAt&size=${size}`);

    if (!res.ok) {
      throw new Error("Failed to fetch best articles");
    }
    return await res.json();
  });
}

export async function updateArticle(id, formData) {
  return apiHandler(async () => {
    const res = await fetch(`${baseUrl}/articles/${id}`, {
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
  });
}

export async function deleteArticle(id) {
  return apiHandler(async () => {
    const res = await fetch(`${baseUrl}/articles/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete article");
    }
    const text = await res.text();
    if (text) {
      return JSON.parse(text);
    }
    return {};
  });
}

export async function createArticle(formData) {
  return apiHandler(async () => {
    const res = await fetch(`${baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server error response:", errorText);
      throw new Error("Failed to create article");
    }
    return await res.json();
  });
}
