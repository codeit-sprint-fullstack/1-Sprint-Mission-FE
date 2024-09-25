import axios from "./axios";

const ENDPOINT = "/users/me";

export async function getUserMe() {
  try {
    const res = await axios.get(ENDPOINT);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function updateUserProfile(data) {
  try {
    const res = await axios.patch(ENDPOINT, data);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function updateUserPassword(data) {
  try {
    const res = await axios.patch(`${ENDPOINT}/password`, data);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
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
  try {
    const res = await axios.get(`${ENDPOINT}/favorites`);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}
