import { instanceWithToken } from "./axios-codeit-token";

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
    const res = await instanceWithToken.post(path, formData);

    return res.data;
  } catch (err) {
    alert(err);
  }
}
