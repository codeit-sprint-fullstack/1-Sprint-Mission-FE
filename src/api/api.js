import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query"; // react-query 추가

// Axios 클라이언트 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 통일된 API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 기본 URL 및 API 엔드포인트 설정
const articlesUrl = "/articles"; // 게시글 관련 엔드포인트
const marketUrl = "/products"; // 중고마켓 상품 관련 엔드포인트
const marketCommentsUrl = "/market/comments"; // 중고마켓 댓글 관련 엔드포인트
const commentsUrl = "/board/comments"; // 자유게시판 댓글 관련 엔드포인트
const authUrl = "/users"; // 로그인 및 회원가입 엔드포인트

// 요청 인터셉터 추가 (액세스 토큰을 요청 헤더에 포함)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
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
  sort = "recent", // 기본값은 최신순
  offset = 0,
  limit = 10,
  search = "",
} = {}) {
  const query = new URLSearchParams({
    sort, // 최신순 또는 좋아요 순
    offset: String(offset), // offset을 문자열로 변환
    limit: String(limit), // limit을 문자열로 변환
    search, // 검색어
  }).toString();

  try {
    const response = await apiClient.get(`${marketUrl}?${query}`);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("상품 목록을 불러오는데 실패했습니다.", error);
    throw error; // 오류 발생 시 다시 던지기
  }
}

/* 상품 등록 API */
export async function createProduct(product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("tags", product.tags);

  // 다중 이미지 추가
  if (product.images && product.images.length > 0) {
    product.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  // 디버그를 위한 로그 추가

  console.log("Form Data Entries:", [...formData.entries()]);
  console.log(product.images);

  const response = await apiClient.post(`${marketUrl}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

/* 상품 상세 조회 API */
export const fetchProductById = async (id) => {
  const response = await apiClient.get(`${marketUrl}/${id}`);
  return response.data;
};

/* 상품 수정 API */
export const updateProduct = async (productId, productData) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("tags", productData.tags);

  // 다중 이미지 처리
  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  const response = await apiClient.patch(
    `${marketUrl}/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* 상품 삭제 API */
export const deleteProduct = async (productId) => {
  await apiClient.delete(`${marketUrl}/${productId}`);
};

/*---------------------중고마켓 상품 관련 댓글 관련 API 호출--------------------*/

/* 상품 ID로 댓글 목록 조회 API */
export async function fetchCommentsByProductId(
  productId,
  cursor = "",
  limit = 15
) {
  const response = await apiClient.get(marketCommentsUrl, {
    params: { marketPostId: productId, cursor, limit },
  });
  return response.data;
}

/* 상품에 댓글 추가 API */
export const createCommentForProduct = async ({ productId, content }) => {
  const response = await apiClient.post(marketCommentsUrl, {
    content,
    marketPostId: productId,
  });
  return response.data;
};

/* 중고마켓 댓글 수정 API */
export const updateMarketComment = async (commentId, content) => {
  const response = await apiClient.patch(`${marketCommentsUrl}/${commentId}`, {
    content,
  });
  return response.data;
};

/* 중고마켓 댓글 삭제 API */
export const deleteMarketComment = async (commentId) => {
  const response = await apiClient.delete(`${marketCommentsUrl}/${commentId}`);
  return response.data;
};

/*---------------------로그인 및 회원가입 API 호출--------------------*/
/* 회원가입 API */
export const registerUser = async (userData) => {
  const response = await apiClient.post(`${authUrl}/signUp`, userData);
  return response.data;
};

/* 로그인 API */
export const loginUser = async (credentials) => {
  const response = await apiClient.post(`${authUrl}/login`, credentials);
  return response.data;
};

/* 토큰 갱신 API */
export const refreshAccessToken = async (refreshToken) => {
  const response = await apiClient.post(`${authUrl}/refresh`, { refreshToken });
  return response.data;
};

/* 로그아웃 API */
export const logoutUser = async (refreshToken) => {
  const response = await apiClient.delete(`${authUrl}/logout`, {
    data: { refreshToken },
  });
  return response.data;
};

/*---------------------좋아요 추가/삭제 API--------------------*/

/* 좋아요 추가/삭제 API */
export const toggleFavorite = async (productId) => {
  const response = await apiClient.post(`${marketUrl}/${productId}/favorite`);
  return response.data;
};

/*---------------------유저 데이터 관련 API 호출--------------------*/
/* 유저 데이터 가져오기 API */
export const fetchUserData = async (token) => {
  const response = await apiClient.get(`${authUrl}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*----------------React Query 훅--------------------*/

/* 상품 목록을 가져오는 훅 */
export const useProductList = (options) => {
  return useQuery(["productList", options], () => getProductList(options));
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
export const useCommentsByProductId = (productId, cursor = "", limit = 15) => {
  return useQuery(["comments", productId, cursor], () =>
    fetchCommentsByProductId(productId, cursor, limit)
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

/* 회원가입 훅 */
export const useRegisterUser = () => {
  return useMutation(registerUser);
};

/* 로그인 훅 */
export const useLoginUser = () => {
  return useMutation(loginUser);
};

/* 로그아웃 훅 */
export const useLogoutUser = () => {
  return useMutation(logoutUser);
};

/* 토큰 갱신 훅 */
export const useRefreshAccessToken = () => {
  return useMutation(refreshAccessToken);
};

/* 유저 데이터 가져오기 훅 */
export const useUserData = (token) => {
  return useQuery("userData", () => fetchUserData(token), {
    enabled: !!token, // 토큰이 있을 때만 쿼리 활성화
  });
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
