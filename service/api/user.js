import axios from "./axios";

const ENDPOINT = "/users/me";

export async function getUserMe() {
  const res = await axios.get(ENDPOINT);
  return res.data;
}

export async function updateUserProfile(data) {
  const res = await axios.patch(ENDPOINT, data);
  return res.data;
}

export async function updateUserPassword(data) {
  const res = await axios.patch(`${ENDPOINT}/password`, data);
  return res.data;
}

export async function getUserProductList() {
  try {
    const res = await axios.get(`${ENDPOINT}/products`);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function getUserFavoriteList() {
  const res = await axios.get(`${ENDPOINT}/favorites`);
  return res.data;
}
