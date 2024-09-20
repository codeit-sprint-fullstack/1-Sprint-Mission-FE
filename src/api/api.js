import axios from "axios";

// Axios 클라이언트 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL, // 인증 관련 API URL
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL:", process.env.NEXT_PUBLIC_AUTH_API_URL);

// 기본 URL 및 API 엔드포인트 설정
const articlesUrl = "/articles";
const commentsUrl = "/board/comments";
const authUrl = "/auth"; // 로그인 및 회원가입 엔드포인트

/*----------------------상품 관련 API ---------------------------*/

export async function getProductList({
  order = "createdAt",
  cursor = null,
  limit = 3,
} = {}) {
  try {
    const query = new URLSearchParams({
      order,
      limit,
      cursor: cursor || "",
    }).toString();
    const response = await apiClient.get(`/products?${query}`);
    const body = response.data;
    console.log("API 응답 데이터:", body);
    return body;
  } catch (error) {
    throw new Error("상품을 불러오는데 실패했습니다");
  }
}

export async function createProduct(product) {
  try {
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
  } catch (error) {
    if (error.response) {
      console.error(
        "상품 생성 실패 - 서버에서 반환한 오류:",
        error.response.data
      );
    } else {
      console.error("상품 생성 실패 - 네트워크 오류:", error.message);
    }
    throw error;
  }
}

/* 상품 상세조회 API */
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    throw error;
  }
};

export function filterProductsByName(products, query) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}

/*---------------------게시글 관련 API 호출--------------------*/

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

export const fetchArticleById = async (id) => {
  try {
    const response = await apiClient.get(`${articlesUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 상세 조회 실패:", error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await apiClient.post(articlesUrl, articleData);
    return response.data;
  } catch (error) {
    console.error("게시글 등록 실패:", error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await apiClient.patch(`${articlesUrl}/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await apiClient.delete(`${articlesUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    throw error;
  }
};

export function filterPostsByName(posts, searchPosts) {
  return posts.filter((post) => post.title.includes(searchPosts));
}

/*---------------------댓글 관련 API 호출--------------------*/

// 중고마켓 상품 상세페이지 댓글 목록 조회 API
export async function fetchCommentsByProductId(productId) {
  try {
    const response = await apiClient.get(`/products/${productId}/comments`);
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw error;
  }
}

// 중고마켓 상품 상세페이지 댓글 등록 API
export const createCommentForProduct = async (productId, commentData) => {
  const requestData = {
    content: commentData.content, // content 필드만 포함
  };

  // 인증 토큰을 localStorage에서 가져오는 경우
  const authToken = localStorage.getItem("accessToken");

  try {
    const response = await apiClient.post(
      `/products/${productId}/comments`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // 토큰을 Authorization 헤더에 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "댓글 등록 실패:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자유게시판 페이지 댓글 조회 API
export async function fetchComments() {
  try {
    const response = await apiClient.get(commentsUrl);
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw error;
  }
}

// 자유게시판 댓글 등록 API
export const createComment = async (commentData) => {
  try {
    const response = await apiClient.post(commentsUrl, commentData);
    return response.data;
  } catch (error) {
    console.error("댓글 등록 실패:", error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (id, commentData) => {
  if (!id) {
    throw new Error("댓글 ID가 필요합니다.");
  }

  try {
    const response = await apiClient.patch(`${commentsUrl}/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error("댓글 수정 실패:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (id) => {
  if (!id) {
    throw new Error("댓글 ID가 필요합니다.");
  }

  try {
    const response = await apiClient.delete(`${commentsUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
};

/*---------------------로그인 및 회원가입 API 호출--------------------*/

/* 로그인 API */
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post(`${authUrl}/signIn`, credentials);
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

/* 회원가입 API */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post(`${authUrl}/signUp`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};
