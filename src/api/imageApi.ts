import axiosInstance from "./axiosInstance";

// 이미지 업로드
export const uploadImage = async (imageFile: File): Promise<{ imageUrl: string }> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axiosInstance.post<{ imageUrl: string }>("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("이미지 업로드 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "이미지 업로드 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

