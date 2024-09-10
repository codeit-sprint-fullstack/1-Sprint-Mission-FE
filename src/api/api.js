import axios from 'axios';

const BASE_URL = 'https://baomarket.onrender.com';

console.log('BASE_URL임:', BASE_URL);

const articlesUrl = `${BASE_URL}/articles`;

// 댓글 경로 생성 함수
const getCommentsUrl = (articleId, commentId = '') => 
  `${BASE_URL}/articles/${articleId}/comments${commentId ? `/${commentId}` : ''}`;

// 게시글 목록 조회
export const fetchArticles = async (params = {}) => {
  try {
    const response = await axios.get(articlesUrl, { params });
    return response.data;
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

// 게시글 상세 조회
export const fetchArticleById = async (id) => {
  try {
    const response = await axios.get(`${articlesUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
};

// 게시글 등록
export const createArticle = async (articleData) => {
  try {
    const response = await axios.post(articlesUrl, articleData);
    return response.data;
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    throw error;
  }
};

// 게시글 수정
export const updateArticle = async (id, articleData) => {
  try {
    const response = await axios.patch(`${articlesUrl}/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
};

// 게시글 삭제
export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${articlesUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
};

/* 게시글 목록에서 검색 */
export function filterPostsByName(posts, searchKeyword) {
  return posts.filter((post) =>
    post.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );
}

// 베스트 게시글 목록 조회 (최신순으로 3개)
export const fetchBestArticles = async () => {
  try {
    const response = await axios.get(`${articlesUrl}/best`);
    return response.data;
  } catch (error) {
    console.error('베스트 게시글 조회 실패:', error);
    throw error;
  }
};

// 댓글 목록 조회
export const fetchComments = async (articleId) => {
  try {
    const response = await axios.get(getCommentsUrl(articleId));
    return response.data;
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error);
    throw error;
  }
};

// 댓글 등록
export const createComment = async (articleId, commentData) => {
  try {
    const response = await axios.post(getCommentsUrl(articleId), commentData);
    return response.data;
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (articleId, commentId, commentData) => {
  try {
    const response = await axios.patch(getCommentsUrl(articleId, commentId), commentData);
    return response.data;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (articleId, commentId) => {
  try {
    const response = await axios.delete(getCommentsUrl(articleId, commentId));
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
};
