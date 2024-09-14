import axios from './axios';

// 베스트 게시글을 가져오는 API
export const fetchBestPosts = async (order = 'recent', limit = 3) => {
  try {
    const res = await axios.get('/posts', {
      params: { order, limit },
    });
    return res.data.posts ?? [];
  } catch (error) {
    console.error('베스트 게시글을 가져오는 중 오류 발생:', error);
    throw new Error('베스트 게시글을 불러오는 중 문제가 발생했습니다.');
  }
};

// 게시글 목록을 가져오는 API
export const fetchPosts = async (query = '', order = 'recent', page = 1) => {
  try {
    // 검색어가 없는 경우에는 search 파라미터를 포함하지 않음
    const params = query
      ? { search: query, order, page } // 검색어가 있으면 search를 포함한 요청
      : { order, page }; // 검색어가 없으면 search를 제외한 요청

    const res = await axios.get('/posts', { params });
    const posts = res.data.posts ?? [];
    const totalPosts = res.data.totalPosts ?? 0;

    return { posts, totalPosts };
  } catch (error) {
    console.error('게시글을 가져오는 중 오류 발생:', error);
    throw new Error('게시글을 불러오는 중 문제가 발생했습니다.');
  }
};

// 게시글 가져오기 API
export const fetchPost = async (postId) => {
  try {
    const res = await axios.get(`/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error('게시글을 불러오는 중 오류 발생:', error);
    throw new Error('게시글을 불러오는 중 오류가 발생했습니다.');
  }
};

// 게시글 생성 API
export const createPost = async (title, content, category, userId) => {
  try {
    const res = await axios.post('/posts', {
      title,
      content,
      category,
      userId,
    });
    return res.data;
  } catch (error) {
    console.error('게시글 생성 중 오류 발생:', error);
    throw new Error('게시글을 생성하는 중 문제가 발생했습니다.');
  }
};

// 댓글 목록 가져오기 API
export const fetchComments = async (postId, cursor = null, take = 5) => {
  try {
    const res = await axios.get(`/comments/free-board/${postId}`, {
      params: {
        cursor,
        take,
      },
    });
    return res.data.comments ?? [];
  } catch (error) {
    console.error('댓글을 불러오는 중 오류 발생:', error);
    throw new Error('댓글을 불러오는 중 오류가 발생했습니다.');
  }
};

// 새로운 댓글 추가 API
export const submitComment = async (postId, content, userId) => {
  try {
    const res = await axios.post(`/comments/free-board/${postId}`, {
      content,
      userId,
    });
    return res.data;
  } catch (error) {
    console.error('댓글 등록에 실패했습니다:', error);
    throw new Error('댓글 등록에 실패했습니다.');
  }
};

// 게시글 수정 API
export const updatePost = async (postId, title, content) => {
  try {
    await axios.patch(`/posts/${postId}`, { title, content });
  } catch (error) {
    console.error('게시글 업데이트에 실패했습니다:', error);
    throw new Error('게시글 업데이트에 실패했습니다.');
  }
};

// 댓글 수정 API
export const updateComment = async (commentId, updatedContent) => {
  try {
    await axios.patch(`/comments/${commentId}`, {
      content: updatedContent,
    });
  } catch (error) {
    console.error('댓글 업데이트에 실패했습니다:', error);
    throw new Error('댓글 업데이트에 실패했습니다.');
  }
};

// 게시글 삭제 API
export const deletePost = async (postId) => {
  try {
    await axios.delete(`/posts/${postId}`);
  } catch (error) {
    console.error('게시글 삭제에 실패했습니다:', error);
    throw new Error('게시글 삭제에 실패했습니다.');
  }
};

// 댓글 삭제 API
export const deleteComment = async (commentId) => {
  try {
    await axios.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error('댓글 삭제에 실패했습니다:', error);
    throw new Error('댓글 삭제에 실패했습니다.');
  }
};
