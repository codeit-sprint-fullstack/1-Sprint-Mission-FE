import axios from "axios";

const api = axios.create({
  baseURL: "https://ms10-5yps.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getProducts(data) {
  try {
    const response = await api.get("/products", data);
    console.log(response.data);
    return response.data.products;
  } catch (error) {
    return error.response;
  }
}

export async function getProduct(productId) {
  try {
    const response = await api.get(`/products/${productId}`);
    // console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function postProduct(data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post("/products", data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
    return error.response;
  }
}

export async function patchProduct(productId, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.patch(`/products/${productId}`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteProduct(productId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/products/${productId}`);
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function deletefavorite(productId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/products/${productId}/favorite`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
export async function postfavorite(productId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(`/products/${productId}/favorites`);
    return response;
  } catch (error) {
    deletefavorite(productId);
    console.log(error);
    return error.response;
  }
}
