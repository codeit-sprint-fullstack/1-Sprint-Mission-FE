import axios from "axios";
import { apiHandler } from "./apiHandler";

const baseUrl = "https://panda-market-api.vercel.app";

export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  return apiHandler(async () => {
    const response = await axios.get(`${baseUrl}/products`, {
      params: { pageSize, page, keyword, orderBy },
    });
    return response.data;
  });
}

export async function createProduct(data) {
  return apiHandler(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(`${baseUrl}/products`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  });
}

export async function deleteProduct(id) {
  return apiHandler(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(`${baseUrl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  });
}

export async function fetchProduct(id) {
  return apiHandler(async () => {
    const response = await axios.get(`${baseUrl}/products/${id}`);
    return response.data;
  });
}

export async function addFavorite(productId) {
  return apiHandler(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${baseUrl}/products/${productId}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  });
}

export async function editProduct(productId, data) {
  return apiHandler(async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.patch(
      `${baseUrl}/products/${productId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  });
}

export async function removeFavorite(productId) {
  return apiHandler(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `${baseUrl}/products/${productId}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  });
}
