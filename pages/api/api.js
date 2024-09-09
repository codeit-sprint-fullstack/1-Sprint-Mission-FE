import axios from "axios";

const api = axios.create({
  baseURL: "https://aritlces.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getArticles(params) {
  try {
    const response = await api.get("/articles", {
      params: params, // 쿼리 파라미터로 전달
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function postArticles(data) {
  try {
    const response = await api.post("/articles", data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function getarticleId(id) {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function postComment(data, id) {
  // page ,pagesize 추가하면 댓글 수량 조절
  try {
    const response = await api.post(`/articles/${id}/comments`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}
export async function deletearticle(id) {
  try {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function deletecomment(id, commentsId) {
  try {
    const response = await api.delete(`/articles/${id}/comments/${commentsId}`);

    // 응답 상태가 200-299일 때만 성공으로 처리
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data, status: response.status };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw error;
  }
}

export async function patcharticle(id, data) {
  try {
    const response = await api.patch(`/articles/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function patchcomment(id, commentsId, data) {
  try {
    const response = await api.patch(
      `/articles/${id}/comments/${commentsId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}
