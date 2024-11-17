import { instance } from "./axios-token";
import { getAccessToken } from "./token-codeit";

/** codeit POST /images/upload 
  return : {
    "url": "string"
  }
*/
export async function uploadImage(imageFile: string) {
  const path = "/image/upload";
  const formData = new FormData();

  formData.append("image", imageFile);

  try {
    const res = await instance.post(path, formData);

    return res.data;
  } catch (err) {
    alert(err);
  }
}
