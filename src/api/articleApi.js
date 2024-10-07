import axiosInstance from "./axiosInstance";

// 게시글 등록
export const createArticle = async (articleData) => {
  try {
    const response = await axiosInstance.post("/articles", articleData);
    console.log("게시글 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "게시글 등록 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 수정
export const updateArticle = async (articleId, articleData) => {
  try {
    const response = await axiosInstance.patch(`/articles/${articleId}`, articleData);
    console.log("게시글 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "게시글 수정 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 삭제
export const deleteArticle = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}`);
    console.log("게시글 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "게시글 삭제 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 목록 조회
export const getArticles = async (page = 1, pageSize = 10, keyword = "") => {
  const response = await axiosInstance.get("/articles", {
    params: { page: page, pageSize: pageSize, keyword: keyword },
  });
  return response.data;
};

// 특정 게시글 조회
export const getArticleById = async (articleId) => {
  const response = await axiosInstance.get(`/articles/${articleId}`);
  return response.data;
};

// 게시글 좋아요
export const favoriteArticle = async (articleId) => {
  const response = await axiosInstance.post(`/articles/${articleId}/favorite`);
  return response.data;
};

// 게시글 좋아요 취소
export const unfavoriteArticle = async (articleId) => {
  const response = await axiosInstance.delete(`/articles/${articleId}/favorite`);
  return response.data;
};

// 이미지 업로드
export const uploadArticleImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile); // 이미지 파일 추가

    const response = await axiosInstance.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("이미지 업로드 성공:", response.data);
    return response.data; // 업로드된 이미지의 URL 반환
  } catch (error) {
    console.error(
      "이미지 업로드 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
