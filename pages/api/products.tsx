import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  Product,
  ErrorResponse,
  GetProductsParams,
  PostProductData,
  PatchProductData,
} from './types/productTypes';

const api = axios.create({
  baseURL: 'https://ms10-5yps.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 제품 목록 조회
export async function getProducts(
  data?: GetProductsParams
): Promise<AxiosResponse<{ products: Product[] }> | ErrorResponse> {
  try {
    const response = await api.get<{ products: Product[] }>('/products', {
      params: data,
    });
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 개별 제품 조회
export async function getProduct(
  productId: string
): Promise<AxiosResponse<Product> | ErrorResponse> {
  try {
    const response = await api.get<Product>(`/products/${productId}`);
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 제품 생성
export async function postProduct(
  data: PostProductData
): Promise<AxiosResponse<Product> | ErrorResponse> {
  try {
    const response = await api.post<Product>('/products', data);
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 제품 수정
export async function patchProduct(
  productId: string,
  data: PatchProductData
): Promise<AxiosResponse<Product> | ErrorResponse> {
  try {
    const response = await api.patch<Product>(`/products/${productId}`, data);
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 제품 삭제
export async function deleteProduct(
  productId: string
): Promise<AxiosResponse<void> | ErrorResponse> {
  try {
    const response = await api.delete<void>(`/products/${productId}`);
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 즐겨찾기 삭제
export async function deletefavorite(
  productId: string
): Promise<AxiosResponse<void> | ErrorResponse> {
  try {
    const response = await api.delete<void>(`/products/${productId}/favorite`);
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 즐겨찾기 추가
export async function postfavorite(
  productId: string
): Promise<AxiosResponse<void> | ErrorResponse> {
  try {
    const response = await api.post<void>(`/products/${productId}/favorites`);
    return response;
  } catch (error) {
    // 즐겨찾기 추가 실패 시 자동으로 즐겨찾기 삭제 요청
    await deletefavorite(productId);
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

export async function uploadImageToS3(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response: AxiosResponse<{ imageUrl: string }> = await api.post(
      'products/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('이미지 업로드 성공:', response.data.imageUrl);
    return response.data.imageUrl;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    return null;
  }
}
