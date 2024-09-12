const baseUrl = "https://thrift-shop.onrender.com/articleComments";

export async function fetchComments(id, page, size) {
  try {
    const response = await fetch(`${baseUrl}/${id}?page=${page}&size=${size}`);

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API error:", error);
    return { data: [], total: 0 };
  }
}

export async function deleteComments(id) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete comments");
    }
    return response;
  } catch (error) {
    console.error("API error:", error);
  }
}

export async function createComments(id, formData) {
  try {
    const dataToSend = { ...formData };

    const response = await fetch(`${baseUrl}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error("Failed to create comments");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
  }
}

export async function updateComments(id, formData) {
  try {
    const dataToSend = { ...formData };
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    if (!response.ok) {
      throw new Error("Failed to update comments");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
  }
}
