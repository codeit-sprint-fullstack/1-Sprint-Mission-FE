import { renderApi } from '@utils/api/axios';

export async function postImages(images) {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append('image', image);
  });

  try {
    const response = await renderApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imageUrls;
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    throw error;
  }
}
