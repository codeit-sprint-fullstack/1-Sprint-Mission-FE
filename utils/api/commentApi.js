import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/comment/',
});

export async function fetchCommentsApi({ articleId, category, cursorId }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.get(`${category}/${articleId}`, {
      headers: config.headers,
      params: { limit: 5, cursor: cursorId },
    });

    return {
      comments: res.data.comments,
      totalCount: res.data.totalCount,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postCommentApi({ category, articleId, comment, userId }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.post(
      `${category}/${articleId}`,
      {
        content: comment,
        articleId: articleId,
        userId: userId,
      },
      config
    );

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function editCommentApi({ id, editComment }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.patch(
      `${id}`,
      {
        content: editComment,
      },
      config
    );
    return res.data;
  } catch (error) {
    console.error('Error editing data:', error);
    throw error;
  }
}

export async function deleteCommentApi(commentId) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.delete(`${commentId}`, config);
    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
  }
}
