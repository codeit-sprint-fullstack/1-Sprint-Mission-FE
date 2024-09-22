import { apiHandler } from "./apiHandler";

const baseUrl = "https://thrift-shop.onrender.com";

export async function fetchComments(id, page, size) {
  return apiHandler(async () => {
    const response = await fetch(
      `${baseUrl}/articleComments/${id}?page=${page}&size=${size}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await response.json();
    return data;
  });
}

export async function deleteComments(id) {
  return apiHandler(async () => {
    const response = await fetch(`${baseUrl}/articleComments/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete comments");
    }
    return response;
  });
}

export async function createComments(id, formData) {
  return apiHandler(async () => {
    const dataToSend = { ...formData };

    const response = await fetch(`${baseUrl}/articleComments/${id}`, {
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
  });
}

export async function updateComments(id, formData) {
  return apiHandler(async () => {
    const dataToSend = { ...formData };
    const response = await fetch(`${baseUrl}/articleComments/${id}`, {
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
  });
}
