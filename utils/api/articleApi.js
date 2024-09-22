import axios from 'axios';

const baseUrl = 'https://sprint-be-ztdn.onrender.com/articles';

export async function fetchFreeBoardArticlesApi({
  orderBy,
  keyword,
  page,
  category,
}) {
  try {
    const res = await axios.get(`${baseUrl}`, {
      params: {
        keyword: keyword || '',
        orderBy: orderBy,
        page: page,
        limit: 5,
        category: category,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFreeBoardBestArticlesApi({ category }) {
  try {
    const res = await axios.get(`${baseUrl}`, {
      params: {
        orderBy: 'recent',
        limit: 3,
        category: category,
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

// export async function postArticleApi({
//   titleValue,
//   contentValue,
//   imageValue,
//   priceValue,
//   tagsValue,
//   categoryValue,
// }) {
//   try {
//     const res = await axios.post(`${baseUrl}`, {
//       title: titleValue,
//       content: contentValue,
//       images: imageValue || [],
//       price: parseInt(priceValue, 10) || null,
//       tags: tagsValue || [],
//       category: categoryValue,
//       userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
//     });

//     return res.data;
//   } catch (error) {
//     console.error('Error posting data:', error);
//   }
// }

export async function postArticleApi({
  titleValue,
  contentValue,
  imageValue,
  priceValue,
  tagsValue,
  categoryValue,
}) {
  try {
    const formData = new FormData();

    formData.append('title', titleValue);
    formData.append('content', contentValue);
    formData.append('category', categoryValue);
    formData.append('userId', '86d761e4-a9d0-4082-96dd-cf6f2c931673');

    formData.append('images', imageValue);

    // if (tagsValue) {
    //   tagsValue.forEach((tag) => {
    //     formData.append('tags', tag);
    //   });
    // }
    // if (priceValue) {
    //   formData.append('price', priceValue || null);
    // }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const res = await axios.post(`${baseUrl}`, formData);

    console.log(res);
    return res;
  } catch (error) {
    alert('게시물 등록에 실패했습니다.');
    console.error('Error deleting data:', error);
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
