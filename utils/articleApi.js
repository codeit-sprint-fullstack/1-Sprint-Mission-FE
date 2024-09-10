export async function fetchArticle(id) {
  const res = await fetch(`https://thrift-shop.onrender.com/articles/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  return res.json();
}

export async function fetchArticles({ sort, keyword, page, size }) {
  try {
    const res = await fetch(
      `https://thrift-shop.onrender.com/articles?sort=${sort}&search=${keyword}&page=${page}&size=${size}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function fetchBestArticles(size) {
  const res = await fetch(
    `https://thrift-shop.onrender.com/articles?sort=createdAt&size=${size}`
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

  const text = await res.text();
  if (text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
    }
  }

  return {};
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
      const errorText = await res.text();
      console.error("Server error response:", errorText);
      throw new Error("Failed to create article");
    }

    return await res.json();
  } catch (error) {
    console.error("Error during article creation:", error.message);
    throw error;
  }
}
