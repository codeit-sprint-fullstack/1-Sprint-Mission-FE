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
  try {
    const res = await axios.get(`${PATH}/products`);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function getUserFavoriteList() {
  const res = await axios.get(`${PATH}/favorites`);
  return res.data;
}
