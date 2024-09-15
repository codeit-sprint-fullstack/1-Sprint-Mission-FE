import axios from 'axios';

const baseUrl = 'https://sprint-be-k938.onrender.com/articles';

export async function fetchFreeBoardArticlesApi({ orderBy, keyword, page }) {
  try {
    const res = await axios.get(`${baseUrl}/freeboard`, {
      params: {
        keyword: keyword || '',
        orderBy: orderBy,
        page: page,
        limit: 5,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFreeBoardBestArticlesApi() {
  try {
    const res = await axios.get(`${baseUrl}/freeboard`, {
      params: {
        orderBy: 'recent',
        limit: 3,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchArticleApi(targetId) {
  try {
    const res = await axios.get(`${baseUrl}/${targetId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postArticleApi({ titleValue, contentValue }) {
  try {
    const res = await axios.post(`${baseUrl}`, {
      title: titleValue,
      content: contentValue,
      category: 'freeboard',
      userId: '9cda174e-2e9e-4523-97cd-362e85a39ebf',
    });

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function editArticleApi(titleValue, contentValue, targetId) {
  try {
    const res = await axios.patch(`${baseUrl}/${targetId}`, {
      title: titleValue,
      content: contentValue,
    });

    return res.data;
  } catch (error) {
    console.error('Error editing data:', error);
  }
}

export async function deleteArticleApi(targetId) {
  try {
    const res = await axios.delete(`${baseUrl}/${targetId}`);

    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
