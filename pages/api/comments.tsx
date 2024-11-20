import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  Comment,
  ErrorResponse,
  PostCommentData,
  PatchCommentData,
  GetCommentsParams,
} from './types/commentTypes';

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

function isAxiosError(error: any): error is AxiosError<ErrorResponse> {
  return error.isAxiosError;
}

// 제품 댓글 가져오기
export async function getComments(
  productId: string,
  limit: number
): Promise<AxiosResponse<Comment[]> | ErrorResponse> {
  try {
    const response = await api.get<Comment[]>(
      `/products/product/${productId}/comments`,
      {
        params: { limit },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}

// 제품 댓글 작성
export async function postComment(
  productId: string,
  data: PostCommentData
): Promise<AxiosResponse<Comment> | ErrorResponse> {
  try {
    const response = await api.post<Comment>(
      `/products/product/${productId}/comments`,
      data
    );
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}

// 제품 댓글 수정
export async function patchComment(
  commentId: string,
  data: PatchCommentData
): Promise<AxiosResponse<Comment> | ErrorResponse> {
  try {
    const response = await api.patch<Comment>(
      `/products/comments/${commentId}`,
      data
    );
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}

// 제품 댓글 삭제
export async function deleteComment(
  commentId: string
): Promise<AxiosResponse<void> | ErrorResponse> {
  try {
    const response = await api.delete<void>(`/products/comments/${commentId}`);
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}

// 게시글 댓글 가져오기
export async function getArticleComments(
  articleId: string,
  limit: number
): Promise<AxiosResponse<Comment[]> | ErrorResponse> {
  try {
    const response = await api.get<Comment[]>(
      `/article/${articleId}/comments`,
      {
        params: { limit },
      }
    );
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}

// 게시글 댓글 작성
export async function postArticleComment(
  articleId: string,
  data: PostCommentData
): Promise<AxiosResponse<Comment> | ErrorResponse> {
  try {
    const response = await api.post<Comment>(
      `/articles/article/${articleId}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}

// 게시글 댓글 수정
export async function patchArticleComment(
  commentId: string,
  data: PatchCommentData
): Promise<AxiosResponse<Comment> | ErrorResponse> {
  try {
    const response = await api.patch<Comment>(
      `/articles/comments/${commentId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}

// 게시글 댓글 삭제
export async function deleteArticleComment(
  commentId: string
): Promise<AxiosResponse<void> | ErrorResponse> {
  try {
    const response = await api.delete<void>(`/articles/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    return isAxiosError(error)
      ? (error.response?.data as ErrorResponse)
      : { response: undefined };
  }
}
