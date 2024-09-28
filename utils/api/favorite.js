import axios from 'axios';

const baseUrl = 'https://sprint-be-ztdn.onrender.com/favorite';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/favorite/',
});

export async function postFavoriteApi({ articleId, category }) {
  try {
    const res = await instance.post(`${category}/${articleId}`, {
      userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
      articleId: articleId,
    });

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function deleteFavoriteApi({ articleId, category }) {
  try {
    const res = await instance.delete(`${category}/${articleId}`, {
      params: {
        userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
      },
    });
    return res.data; // 필요한 경우 응답 데이터 반환
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
