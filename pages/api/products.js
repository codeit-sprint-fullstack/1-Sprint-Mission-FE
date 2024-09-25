import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getProducts() {
  try {
    const response = await api.get("/products");
    return response.data.list;
  } catch (error) {
    return error.response;
  }
}

export async function getProduct(productId) {
  try {
    const response = await api.get(`/products/${productId}`);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function postProduct(data) {
  // console.log(data);
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post("/products", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await api.patch(`/products/${productId}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteProduct(productId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function deletefavorite(productId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/products/${productId}/favorite`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
export async function postfavorite(productId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(
      `/products/${productId}/favorite`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    deletefavorite(productId);
    console.log(error);
    return error.response;
  }
}
