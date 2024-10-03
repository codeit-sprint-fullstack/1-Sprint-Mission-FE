import axios from "./axios";

const PATH = "/users/me";

export async function getUserMe() {
  const res = await axios.get(PATH);
  return res.data;
}

export async function updateUserProfile(data) {
  const res = await axios.patch(PATH, data);
  return res.data;
}

export async function updateUserPassword(data) {
  const res = await axios.patch(`${PATH}/password`, data);
  return res.data;
}

export async function getUserProductList() {
  const res = await axios.get(`${PATH}/products`);
  return res.data;
}

export async function getUserFavoriteList() {
  const res = await axios.get(`${PATH}/favorites`);
  return res.data;
}

//이미지 업로드해서 Url받는 api
export async function createImageUrl(formData) {
  const res = await axios.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
