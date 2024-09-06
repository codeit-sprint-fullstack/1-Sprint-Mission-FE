export async function fetchComments(id) {
  try {
    const response = await fetch(
      `https://thrift-shop.onrender.com/articleComments/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

export async function deleteComments(id) {
  try {
    const response = await fetch(
      `https://thrift-shop.onrender.com/articleComments/${id}`,
      {
        method: "DELETE",
      }
    );
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

    const response = await fetch(
      `https://thrift-shop.onrender.com/articleComments/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );

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
    const response = await fetch(
      `https://thrift-shop.onrender.com/articleComments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update comments");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
  }
}
