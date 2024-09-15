import instance from "./axios.js";

export async function getArticles(params = {}, cursor = "") {
  try {
    const res = await instance.get("/articles", {
      params: { ...params, cursor },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return null; // 혹은 적절한 기본값을 리턴
  }
}

export async function getBestArticles(
  params = {
    orderBy: "favorite",
    limit: 3,
  }
) {
  try {
    const res = await instance.get("/articles", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch best articles:", error);
    return null;
  }
}

export async function getArticle(id) {
  try {
    const res = await instance.get(`/articles/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch article with id ${id}:`, error);
    return null;
  }
}

export async function updateArticle(id, item) {
  try {
    const res = await instance.patch(`/articles/${id}`, item);
    return res.data;
  } catch (error) {
    console.error(`Failed to update article with id ${id}:`, error);
    return null;
  }
}

export async function createArticle(item) {
  try {
    const res = await instance.post(`/articles`, item);
    return res.data;
  } catch (error) {
    console.error("Failed to create article:", error);
    return null;
  }
}

export async function deleteArticle(id) {
  try {
    const res = await instance.delete(`/articles/${id}`);
    return res.status;
  } catch (error) {
    console.error(`Failed to delete article with id ${id}:`, error);
    return null; // 여기서는 에러 상태에 따라 다르게 처리할 수 있습니다.
  }
}
