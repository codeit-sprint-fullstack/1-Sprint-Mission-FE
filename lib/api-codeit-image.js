import axios from "axios";

const axiosConfig = {
  baseURL: "https://panda-market-api.vercel.app",
  header: {
    "Content-Type": "multipart/form-data",
  },
};

const instance = axios.create(axiosConfig);

/** codeit POST /images/upload */
export async function uploadImage(imageFile) {
  const path = "/images/upload";
  const formData = new FormData();

  formData.append("image", imageFile);

  //   {
  //     "url": "string"
  //   }

  try {
    const res = await instance.post(path, formData);
    return res.data;
  } catch (err) {
    alert(err);
  }
}
