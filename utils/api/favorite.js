import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/favorite',
});

const accessToken = localStorage.getItem('accessToken');

export async function postFavoriteApi({ articleId, userId }) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { userId },
    };

    const res = await instance.post(`/${articleId}`, {}, config);

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function deleteFavoriteApi({ articleId, userId }) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.delete(`/${articleId}`, {
      headers: config.headers,
      params: { userId },
    });

    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
