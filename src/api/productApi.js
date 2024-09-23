import axios from "axios";

const baseUrl = "https://panda-market-api.vercel.app";

// 상품 등록
export const createProduct = async (productData, accessToken) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/products`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: productData,
    });

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
export const updateProduct = async (productId, productData, accessToken) => {
  try {
    const response = await axios({
      method: "put",
      url: `${baseUrl}/products/${productId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: productData,
    });

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

// 상품 목록 조회
export const getProducts = async (
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = ""
) => {
  const response = await axios({
    method: "get",
    url: `${baseUrl}/products`,
    params: {
      page: page,
      pageSize: pageSize,
      orderBy: orderBy,
      keyword: keyword,
    },
  });
  return response.data;
};

// 특정 상품 조회
export const getProductById = async (productId) => {
  const response = await axios({
    method: "get",
    url: `${baseUrl}/products/${productId}`,
  });
  return response.data;
};

// 상품 좋아요
export const favoriteProduct = async (productId, accessToken) => {
  const response = await axios({
    method: "post",
    url: `${baseUrl}/products/${productId}/favorite`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 상품 좋아요 취소
export const unfavoriteProduct = async (productId, accessToken) => {
  const response = await axios({
    method: "delete",
    url: `${baseUrl}/products/${productId}/favorite`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const uploadImage = async (imageFile, accessToken) => {
  try {
    // JWT 토큰 확인
    console.log("Access Token:", accessToken);

    const formData = new FormData();
    formData.append("image", imageFile); // 이미지 파일 추가

    const response = await axios({
      method: "post",
      url: "https://panda-market-api.vercel.app/images/upload",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    console.log("이미지 업로드 성공:", response.data);
    return response.data; // 업로드된 이미지의 URL 반환
  } catch (error) {
    // 토큰 관련 오류 메시지 확인
    console.error(
      "이미지 업로드 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

