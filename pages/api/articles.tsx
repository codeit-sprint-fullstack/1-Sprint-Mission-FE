import axios from 'axios';
import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  Article,
  ErrorResponse,
  GetArticlesParams,
  PostArticleData,
} from './types/articleTypes';
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
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

function isAxiosError(error: any): error is AxiosError<ErrorResponse> {
  return error.isAxiosError;
}

export async function getArticles(
  data?: GetArticlesParams
): Promise<AxiosResponse<Article[]> | ErrorResponse> {
  try {
    const response = await api.get<Article[]>('/articles', {
      params: data,
    });
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }
    throw error;
  }
}

export async function getArticleId(
  articleId: string,
  pageSize?: number
): Promise<AxiosResponse<{ article: Article }> | ErrorResponse> {
  try {
    const response = await api.get<{ article: Article }>(
      `/articles/${articleId}`,
      {
        params: {
          pageSize,
        },
      }
    );
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }
    throw error;
  }
}

export async function patchArticle(
  articleId: string,
  data: Partial<Article>
): Promise<AxiosResponse<Article> | ErrorResponse> {
  try {
    const response = await api.patch<Article>(`/articles/${articleId}`, data);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }
    throw error;
  }
}

export async function deleteArticle(
  articleId: string
): Promise<AxiosResponse<void> | ErrorResponse> {
  try {
    const response = await api.delete<void>(`/articles/${articleId}`);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }
    throw error;
  }
}

export async function postArticle(
  data: PostArticleData
): Promise<AxiosResponse<Article> | ErrorResponse> {
  try {
    const response = await api.post<Article>('/articles', data);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }
    throw error;
  }
}

export async function postFavorite(
  articleId: string
): Promise<AxiosResponse<void> | ErrorResponse> {
  try {
    const response = await api.post<void>(`/articles/${articleId}/favorites`);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }
    throw error;
  }
}
