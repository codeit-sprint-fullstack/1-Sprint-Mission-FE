import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query"; // react-query 추가

// Axios 클라이언트 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL, // 인증/중고마켓 관련 API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 자유게시판 API 클라이언트
const boardApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BOARD_API_URL, // 자유게시판 관련 API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 기본 URL 및 API 엔드포인트 설정
const articlesUrl = "/articles";
const commentsUrl = "/board/comments";
const marketCommentsUrl = "/products"; // 중고마켓 댓글
const authUrl = "/auth"; // 로그인 및 회원가입 엔드포인트

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    // 인증이 필요한 경우에만 Authorization 헤더 추가
    if (token && !config.url.includes("/products")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*----------------------상품 관련 API ---------------------------*/

/* 상품 목록 조회 API */
export async function getProductList({
  order = "createdAt",
  cursor = null,
  limit = 3,
} = {}) {
  const query = new URLSearchParams({
    order,
    limit,
    cursor: cursor || "",
  }).toString();
  const response = await apiClient.get(`/products?${query}`);
  return response.data;
}

/* 상품 생성 API */
export async function createProduct(product) {
  const { name, description, price, tags } = product;
  if (!name || !description || !price) {
    throw new Error("상품 이름과 설명, 판매가격은 필수로 적어주세요.");
  }
  const response = await apiClient.post("/products", {
    name,
    description,
    price,
    tags,
  });
  return response.data;
}

/* 상품 상세 조회 API */
export const fetchProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

/* 상품 수정 API */
export const updateProduct = async (productId, productData) => {
  const authToken = localStorage.getItem("accessToken");
  const response = await apiClient.patch(
    `/products/${productId}`,
    productData,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  return response.data;
};

/* 상품 삭제 API */
export const deleteProduct = async (productId) => {
  const authToken = localStorage.getItem("accessToken");
  await apiClient.delete(`/products/${productId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

/*---------------------중고마켓 상품 관련 댓글 관련 API 호출--------------------*/

/* 상품 ID로 댓글 조회 API */
export async function fetchCommentsByProductId(productId, limit = 3) {
  const response = await apiClient.get(
    `${marketCommentsUrl}/${productId}/comments`,
    { params: { limit } }
  );
  return response.data;
}

/* 상품에 댓글 추가 API */
export const createCommentForProduct = async (productId, commentData) => {
  const requestData = { content: commentData.content };
  const authToken = localStorage.getItem("accessToken");
  const response = await apiClient.post(
    `${marketCommentsUrl}/${productId}/comments`,
    requestData,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  return response.data;
};

/* 중고마켓 댓글 수정 API */
export const updateMarketComment = async (commentId, commentData) => {
  const requestData = { content: commentData.content };
  const authToken = localStorage.getItem("accessToken");
  const response = await apiClient.patch(
    `/comments/${commentId}`,
    requestData,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  return response.data;
};

/* 중고마켓 댓글 삭제 API */
export const deleteMarketComment = async (commentId) => {
  const authToken = localStorage.getItem("accessToken");
  const response = await apiClient.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

/*---------------------로그인 및 회원가입 API 호출--------------------*/

/* 로그인 API */
export const loginUser = async (credentials) => {
  const response = await apiClient.post(`${authUrl}/signIn`, credentials);
  return response.data;
};

/* 회원가입 API */
export const registerUser = async (userData) => {
  const response = await apiClient.post(`${authUrl}/signUp`, userData);
  return response.data;
};

/* 유저 데이터 가져오는 API */
export const fetchUserData = async (token) => {
  const response = await apiClient.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* 토큰 갱신 API */
export const refreshAccessToken = async (refreshToken) => {
  const response = await axios.post(
    "https://panda-market-api.vercel.app/auth/refresh",
    {
      refreshToken, // 리프레시 토큰을 서버로 보냄
    }
  );
  return response.data;
};

/*---------------------좋아요 추가/삭제 API--------------------*/

/* 좋아요 추가/삭제 API */
export const toggleFavorite = async (productId, method) => {
  const token = localStorage.getItem("accessToken"); // 사용자 인증 토큰 가져옴
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `/products/${productId}/favorite`;
  const response = await apiClient({ method: method, url: url, ...config });
  return response.data;
};

/*---------------------React Query 훅--------------------*/

/* 상품 목록을 가져오는 훅 */
export const useProductList = (options) => {
  return useQuery("productList", () => getProductList(options));
};

/* 상품 생성 훅 */
export const useCreateProduct = () => {
  return useMutation(createProduct);
};

/* 상품 상세조회 훅 */
export const useProductById = (id) => {
  return useQuery(["product", id], () => fetchProductById(id));
};

/* 상품 수정 훅 */
export const useUpdateProduct = () => {
  return useMutation(updateProduct);
};

/* 상품 삭제 훅 */
export const useDeleteProduct = () => {
  return useMutation(deleteProduct);
};

/* 댓글 목록 조회 훅 */
export const useCommentsByProductId = (productId) => {
  return useQuery(["comments", productId], () =>
    fetchCommentsByProductId(productId)
  );
};

/* 댓글 생성 훅 */
export const useCreateCommentForProduct = () => {
  return useMutation(createCommentForProduct);
};

/* 댓글 수정 훅 */
export const useUpdateMarketComment = () => {
  return useMutation(updateMarketComment);
};

/* 댓글 삭제 훅 */
export const useDeleteMarketComment = () => {
  return useMutation(deleteMarketComment);
};

/* 로그인 훅 */
export const useLoginUser = () => {
  return useMutation(loginUser);
};

/* 회원가입 훅 */
export const useRegisterUser = () => {
  return useMutation(registerUser);
};

/* 유저 데이터 가져오기 훅 */
export const useUserData = (token) => {
  return useQuery("userData", () => fetchUserData(token));
};

/* 토큰 갱신 훅 */
export const useRefreshAccessToken = () => {
  return useMutation(refreshAccessToken);
};

/* 좋아요 추가/삭제 훅 */
export const useToggleFavorite = () => {
  return useMutation(toggleFavorite);
};

/*---------------------자유게시판 게시글 관련 API 호출--------------------*/

/* 게시글 목록 조회 API */
export async function fetchArticles({
  order = "createdAt",
  cursor = null,
  limit = 10,
} = {}) {
  try {
    const query = new URLSearchParams({
      order,
      limit,
      cursor: cursor || "",
    }).toString();
    const response = await apiClient.get(`${articlesUrl}?${query}`);
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    throw error;
  }
}

/* 게시글 상세 조회 API */
export const fetchArticleById = async (id) => {
  try {
    const response = await apiClient.get(`${articlesUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 상세 조회 실패:", error);
    throw error;
  }
};

/* 게시글 생성 API */
export const createArticle = async (articleData) => {
  try {
    const response = await apiClient.post(articlesUrl, articleData);
    return response.data;
  } catch (error) {
    console.error("게시글 등록 실패:", error);
    throw error;
  }
};

/* 게시글 수정 API */
export const updateArticle = async (id, articleData) => {
  try {
    const response = await apiClient.patch(`${articlesUrl}/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};

/* 게시글 삭제 API */
export const deleteArticle = async (id) => {
  try {
    await apiClient.delete(`${articlesUrl}/${id}`);
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    throw error;
  }
};

/*---------------------자유게시판 댓글 관련 API 호출--------------------*/

/* 댓글 목록 조회 API */
export async function fetchCommentsByArticleId(articleId) {
  const response = await boardApiClient.get(`${commentsUrl}/${articleId}`);
  return response.data;
}

/* 댓글 생성 API */
export const createCommentForArticle = async (articleId, commentData) => {
  const response = await boardApiClient.post(
    `${commentsUrl}/${articleId}`,
    commentData
  );
  return response.data;
};

/* 댓글 수정 API */
export const updateComment = async (commentId, commentData) => {
  const response = await boardApiClient.patch(
    `${commentsUrl}/${commentId}`,
    commentData
  );
  return response.data;
};

/* 댓글 삭제 API */
export const deleteComment = async (commentId) => {
  await boardApiClient.delete(`${commentsUrl}/${commentId}`);
};
