import axiosInstance from "./axiosInstance";

// 상품 등록
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/products", productData);
    console.log("서버 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "상품 등록 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 상품 수정
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosInstance.patch(`/products/${productId}`, productData);
    console.log("상품 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "상품 수정 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 상품 삭제
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    console.log("상품 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "상품 삭제 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 상품 목록 조회
export const getProducts = async (page = 1, pageSize = 10, orderBy = "recent", keyword = "") => {
  const response = await axiosInstance.get("/products", {
    params: { page: page, pageSize: pageSize, orderBy: orderBy, keyword: keyword },
  });
  return response.data;
};

// 특정 상품 조회
export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data;
};

// 상품 좋아요
export const favoriteProduct = async (productId) => {
  console.log("좋아요 추가 요청 보냄:", productId); // 요청 전에 로그 추가
  try {
    const response = await axiosInstance.post(`/products/${productId}/like`);
    console.log("좋아요 추가 응답:", response.data); // 성공 응답 로그 추가
    return response.data;
  } catch (error) {
    console.error("좋아요 추가 중 에러:", error.response ? error.response.data : error.message); // 에러 로그 추가
    throw error;
  }
};

// 상품 좋아요 취소
export const unfavoriteProduct = async (productId) => {
  console.log("좋아요 취소 요청 보냄:", productId); // 요청 전에 로그 추가
  try {
    const response = await axiosInstance.delete(`/products/${productId}/like`);
    console.log("좋아요 취소 응답:", response.data); // 성공 응답 로그 추가
    return response.data;
  } catch (error) {
    console.error("좋아요 취소 중 에러:", error.response ? error.response.data : error.message); // 에러 로그 추가
    throw error;
  }
};

// 이미지 업로드
export const uploadImage = async (imageFile) => {
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

