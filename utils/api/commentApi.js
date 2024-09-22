import axios from 'axios';

const baseUrl = 'https://sprint-be-ztdn.onrender.com/comments';

export async function fetchCommentsApi(articleId, cursorId) {
  try {
    const res = await axios.get(`${baseUrl}/${articleId}`, {
      params: {
        limit: 6,
        cursor: cursorId,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postCommentApi(articleId, comment) {
  try {
    const res = await axios.post(`${baseUrl}`, {
      content: comment,
      articleId: Number(articleId),
      userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
    });

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function editCommentApi(id, editComment) {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, {
      content: editComment,
    });
  } catch (error) {
    console.error('Error editing data:', error);
  }
}

export async function deleteCommentApi(commentId) {
  try {
    const res = await axios.delete(`${baseUrl}/${commentId}`);
    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
  }
}
