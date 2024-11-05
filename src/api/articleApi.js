import axiosInstance from "./axiosInstance";

// 게시글 등록
export const createArticle = async (articleData) => {
  console.log("게시글 등록 요청 데이터:", articleData);
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
  console.log("게시글 수정 요청 ID와 데이터:", articleId, articleData);
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
  console.log("게시글 삭제 요청 ID:", articleId);
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

// 최신 게시글 목록 조회
export const fetchArticles = async (page = 1, pageSize = 10, keyword = "", orderBy = "recent") => {
  console.log("최신 게시글 목록 조회 요청:", { page, pageSize, keyword, orderBy });
  try {
    const response = await axiosInstance.get("/articles", {
      params: { page, pageSize, keyword, orderBy },
    });
    console.log("최신 게시글 목록 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("최신 게시글 목록 조회 중 오류:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 베스트 게시글 목록 조회
export const fetchBestArticles = async (page = 1, pageSize = 10) => {
  console.log("베스트 게시글 목록 조회 요청:", { page, pageSize });
  try {
    const response = await axiosInstance.get("/articles", {
      params: { page, pageSize, orderBy: "like" },
    });
    console.log("베스트 게시글 목록 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("베스트 게시글 목록 조회 중 오류:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 특정 게시글 조회
export const getArticleById = async (articleId) => {
  console.log("특정 게시글 조회 요청 ID:", articleId);
  try {
    const response = await axiosInstance.get(`/articles/${articleId}`);
    console.log("특정 게시글 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "특정 게시글 조회 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 좋아요
export const favoriteArticle = async (articleId) => {
  console.log("좋아요 추가 요청 ID:", articleId);
  try {
    const response = await axiosInstance.post(`/articles/${articleId}/favorite`);
    console.log("좋아요 추가 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "좋아요 추가 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 좋아요 취소
export const unfavoriteArticle = async (articleId) => {
  console.log("좋아요 취소 요청 ID:", articleId);
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}/favorite`);
    console.log("좋아요 취소 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "좋아요 취소 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 이미지 업로드
export const uploadArticleImage = async (imageFile) => {
  console.log("이미지 파일 업로드 요청:", imageFile);
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axiosInstance.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("이미지 업로드 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "이미지 업로드 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
