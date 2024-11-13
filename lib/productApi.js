import instance from "./axios";

// 특정 상품 조회
export const getProductById = async (productId) => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken 가져오기

  if (!token) {
    throw new Error("로그인이 필요합니다."); // 토큰이 없으면 에러 처리
  }
  try {
    const res = await instance.get(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 accessToken 포함
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 특정 상품 수정

// 특정 상품 삭제
export const deleteProductById = async (productId) => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken 가져오기

  if (!token) {
    throw new Error("로그인이 필요합니다."); // 토큰이 없으면 에러 처리
  }

  try {
    const res = await instance.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 accessToken 포함
      },
    });
  } catch (error) {
    console.log("상품 삭제 실패 :", error);

    throw error;
  }
};

// 특정 상품 코멘트 조회
export const getProductByIdComments = async (productId) => {
  const res = await instance.get(`/products/${productId}/comments`, {
    params: {
      limit: 10, // URL 쿼리 스트링
    },
  });
  return res.data;
};

// 특정 상품 코멘트 등록
export const createProductByIdComments = async (productId, content) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }
  try {
    const res = await instance.post(
      `/products/${productId}/comments`,
      { content }, // POST 본문에 content 포함
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 accessToken 포함
        },
      }
    );
    return res;
  } catch (error) {
    console.log("postComments 에러 발생: ", error);

    throw error;
  }
};

// 특정 상품 코멘트 수정
export const patchProductByIdComment = async (commentId, content) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const res = await instance.patch(
      `/comments/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 accessToken 가져오기
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("상품 댓글 수정 실패 : ", error);

    throw error;
  }
};

// 특정 상품 코멘트 삭제
export const deleteProductByIdComment = async (commentId) => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken 가져오기

  if (!token) {
    throw new Error("로그인이 필요합니다."); // 토큰이 없으면 에러 처리
  }

  try {
    const res = await instance.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 accessToken 포함
      },
    });
  } catch (error) {
    console.log("상품 댓글 삭제 실패 : ", error);

    throw error;
  }
};
