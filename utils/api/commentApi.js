import axios from 'axios';

const baseUrl = 'https://sprint-be-ztdn.onrender.com/comments';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/comments/',
});

export async function fetchCommentsApi({ articleId, category, cursorId }) {
  try {
    const res = await instance.get(`${category}/${articleId}`, {
      params: {
        limit: 5,
        cursor: cursorId,
      },
    });

    return {
      comments: res.data.comments,
      totalCount: res.data.totalCount,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postCommentApi({ category, articleId, comment }) {
  try {
    const res = await instance.post(`${category}/${articleId}`, {
      content: comment,
      articleId: articleId,
      userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
    });

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function editCommentApi({ id, editComment }) {
  try {
    const res = await instance.patch(`${id}`, {
      content: editComment,
    });
    return res.data; // 수정된 댓글 데이터를 반환
  } catch (error) {
    console.error('Error editing data:', error);
    throw error; // 오류를 던져서 useMutation에서 처리할 수 있도록 함
  }
}

export async function deleteCommentApi(commentId) {
  try {
    const res = await instance.delete(`${commentId}`);
    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
  }
}
