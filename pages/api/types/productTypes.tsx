export interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
    status: number;
  };
}

// 제품 데이터 구조
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  ownerNickname: string;
  // 다른 필요한 필드들이 있으면 추가 가능
}

// 제품 목록 조회 시 사용할 요청 파라미터 타입
export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  orderByField?: string;
  orderDir?: string;
  keyword?: string;
}

// 제품 생성 시 보낼 데이터 타입
export interface PostProductData {
  name: string;
  description: string;
  price: number;
  images: string[];
  tags?: string[];
}

// 제품 수정 시 보낼 데이터 타입
export interface PatchProductData {
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  tags?: string[];
}
