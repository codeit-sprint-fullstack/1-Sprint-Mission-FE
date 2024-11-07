import axiosInstance from "./axiosInstance";

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  likes: number;
  tags?: string[];
  userId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse extends ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  
}

// 상품 등록
export const createProduct = async (productData: ProductData): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>("/products", productData);
    console.log("서버 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "상품 등록 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 상품 수정
export const updateProduct = async (productId: number, productData: Partial<ProductData>): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.patch<ProductResponse>(`/products/${productId}`, productData);
    console.log("상품 수정 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "상품 수정 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 상품 삭제
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/products/${productId}`);
    console.log("상품 삭제 성공");
  } catch (error: any) {
    console.error(
      "상품 삭제 중 오류 발생:",
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
): Promise<ProductResponse[]> => {
  try {
    const response = await axiosInstance.get<ProductResponse[]>("/products", {
      params: { page, pageSize, orderBy, keyword },
    });
    return response.data;
  } catch (error: any) {
    console.error("상품 목록 조회 중 오류 발생:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 특정 상품 조회
export const getProductById = async (productId: number): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`/products/${productId}`);
    return response.data;
  } catch (error: any) {
    console.error("특정 상품 조회 중 오류 발생:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 상품 좋아요
export const favoriteProduct = async (productId: number): Promise<ProductResponse> => {
  console.log("좋아요 추가 요청 보냄:", productId);
  try {
    const response = await axiosInstance.post<ProductResponse>(`/products/${productId}/like`);
    console.log("좋아요 추가 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("좋아요 추가 중 에러:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 상품 좋아요 취소
export const unfavoriteProduct = async (productId: number): Promise<ProductResponse> => {
  console.log("좋아요 취소 요청 보냄:", productId);
  try {
    const response = await axiosInstance.delete<ProductResponse>(`/products/${productId}/like`);
    console.log("좋아요 취소 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("좋아요 취소 중 에러:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 이미지 업로드
export const uploadImage = async (imageFile: File): Promise<{ imageUrl: string }> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axiosInstance.post<{ imageUrl: string }>("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("이미지 업로드 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "이미지 업로드 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

