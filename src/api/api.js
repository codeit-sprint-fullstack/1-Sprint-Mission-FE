import axios from 'axios';

const api = axios.create({
  baseURL: 'https://baomarket.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 베스트 게시글 목록 조회
export async function fetchBestArticles() {
  try {
    const response = await api.get('/articles/best');
    return response.data;
  } catch (error) {
    console.error('베스트 게시글 조회 실패:', error);
    throw error;
  }
}

// 게시글 목록 조회
export async function fetchArticles(params) {
  try {
    const response = await api.get('/articles', { params });
    return response.data;
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
}

// 게시글 상세 조회
export async function fetchArticleById(id) {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
}

// 게시글 등록
export async function createArticle(articleData) {
  try {
    const response = await api.post('/articles', articleData);
    return response.data;
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    throw error;
  }
}

// 게시글 수정
export async function updateArticle(id, articleData) {
  try {
    const response = await api.patch(`/articles/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
}

// 게시글 삭제
export async function deleteArticle(id) {
  try {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
}

// 댓글 목록 조회
export async function fetchComments(articleId) {
  try {
    const response = await api.get(`/articles/${articleId}/comments`);
    return response.data;
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error);
    throw error;
  }
}

// 댓글 등록
export async function createComment(articleId, commentData) {
  try {
    const response = await api.post(`/articles/${articleId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
}

// 댓글 수정
export async function updateComment(articleId, commentId, commentData) {
  try {
    const response = await api.patch(`/articles/${articleId}/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
}

// 댓글 삭제
export async function deleteComment(articleId, commentId) {
  try {
    const response = await api.delete(`/articles/${articleId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
}

