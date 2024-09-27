import axios from "axios";

const axiosConfig = {
  baseURL: "https://panda-market-api.vercel.app",
  header: {
    "Content-Type": "multipart/form-data",
  },
};

const instance = axios.create(axiosConfig);

/** codeit POST /images/upload 
  return : {
    "url": "string"
  }
*/
export async function uploadImage(imageFile) {
  const path = "/images/upload";
  const formData = new FormData();
  // token 필요 여부 확인 필요
  formData.append("image", imageFile);

  try {
    const res = await instance.post(path, formData);
    return res.data;
  } catch (err) {
    alert(err);
  }
}
