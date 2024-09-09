import axios from "axios";

//const BASE_URL = 'https://panda-market-api.vercel.app/products';

//로컬 개발 서버
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("BASE_URL:", BASE_URL);

// 게시글 API 호출
const articlesUrl = `${BASE_URL}/articles`;

// 댓글 API 호출
const commentsUrl = `${BASE_URL}/board/comments`;

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
    const response = await axios.get(`${BASE_URL}?${query}`);
    const body = response.data;
    console.log("API 응답 데이터:", body);
    return body;
  } catch (error) {
    throw new Error("상품을 불러오는데 실패했습니다");
  }
}

// 새 상품 등록
export async function createProduct(product) {
  try {
    const { name, description, price, tags } = product;

    if (!name || !description || !price) {
      throw new Error("상품 이름과 설명, 판매가격은 필수로 적어주세요.");
    }

    const response = await axios.post(
      BASE_URL,
      {
        name: product.name,
        description: product.description,
        price: product.price,
        tags: product.tags, // 이 부분은 이미 배열 형태로 전달됨
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

/* 제품 목록을 필터링하는 함수 */
export function filterProductsByName(products, query) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}

/*---------------------게시글 관련 API 호출--------------------*/
// 게시글 목록 조회
export const fetchArticles = async (params = {}) => {
  try {
    const response = await axios.get(articlesUrl, { params });
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    throw error;
  }
};

// 게시글 상세 조회
export const fetchArticleById = async (id) => {
  try {
    const response = await axios.get(`${articlesUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 상세 조회 실패:", error);
    throw error;
  }
};

// 게시글 등록
export const createArticle = async (articleData) => {
  try {
    const response = await axios.post(articlesUrl, articleData);
    return response.data;
  } catch (error) {
    console.error("게시글 등록 실패:", error);
    throw error;
  }
};

// 게시글 수정
export const updateArticle = async (id, articleData) => {
  try {
    const response = await axios.patch(`${articlesUrl}/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${articlesUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    throw error;
  }
};

/* 게시글 목록을 필터링하는 함수 */
export function filterPostsByName(posts, searchPosts) {
  return posts.filter((post) => post.title.includes(searchPosts));
}

/*---------------------댓글 관련 API 호출--------------------*/
// 댓글 목록 조회
export const fetchComments = async (params = {}) => {
  try {
    const response = await axios.get(commentsUrl, { params });
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw error;
  }
};

// 댓글 상세 조회 (단일 댓글 조회를 위한 API가 없다면, 댓글 목록 조회 API로 대체 가능)
export const fetchCommentById = async (id) => {
  try {
    const response = await axios.get(`${commentsUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("댓글 상세 조회 실패:", error);
    throw error;
  }
};

// 댓글 등록
export const createComment = async (commentData) => {
  try {
    const response = await axios.post(commentsUrl, commentData);
    return response.data;
  } catch (error) {
    console.error("댓글 등록 실패:", error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (id, commentData) => {
  try {
    const response = await axios.patch(`${commentsUrl}/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error("댓글 수정 실패:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${commentsUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
};
