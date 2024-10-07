import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/fleamarket',
});

export async function fetchFleaMarketBestApi() {
  try {
    const res = await instance.get(`/`, {
      params: {
        sort: 'favorite',
        limit: 4,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFleaMarketApi({ keyword, sort, page }) {
  try {
    const res = await instance.get(`/`, {
      params: {
        keyword: keyword || '',
        sort: sort,
        page: page,
        limit: 10,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFleaMarketArticleApi({ id, userId }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.get(`/${id}`, {
      headers: config.headers,
      params: { userId },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postFleaMarketArticleApi({
  title,
  content,
  images,
  price,
  userId,
  tags,
}) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', userId);

    images.forEach((file) => {
      formData.append('images', file);
    });

    formData.append('tags', tags);
    formData.append('price', price);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.post(`/post`, formData, config);

    return res;
  } catch (error) {
    alert('게시물 등록에 실패했습니다.');
    console.error('Error posting data:', error);
  }
}

export async function editFleaMarketArticleApi({
  id,
  title,
  content,
  images,
  price,
  userId,
  tags,
}) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', userId);

    images?.forEach((file) => {
      formData.append('images', file);
    });

    formData.append('tags', tags);
    formData.append('price', price);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.patch(`/${id}/edit`, formData, config);

    return res.data;
  } catch (error) {
    console.error('Error editing data:', error);
  }
}

export async function deleteFleaMarketArticleApi(id) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const res = await instance.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
