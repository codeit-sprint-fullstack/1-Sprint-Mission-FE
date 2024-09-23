import axios from "axios";

const baseUrl = "https://panda-market-api.vercel.app";

export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  try {
    const response = await axios.get(`${baseUrl}/products`, {
      params: { pageSize, page, keyword, orderBy },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

export async function createProduct(data) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(`${baseUrl}/products`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create product");
  }
}

export async function deleteProduct(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(`${baseUrl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
}

export async function fetchProduct(id) {
  try {
    const response = await axios.get(`${baseUrl}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
}

export async function addFavorite(productId) {
  try {
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
  } catch (error) {
    throw new Error("Failed to add favorite");
  }
}

export async function editProduct(productId, data) {
  console.log(productId, data);
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Token: ", accessToken);
    console.log("Data to send: ", data);

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
  } catch (error) {
    console.error(
      "Error during edit product:",
      error.response || error.message
    );
    throw new Error("Failed to edit product");
  }
}

export async function removeFavorite(productId) {
  try {
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
  } catch (error) {
    throw new Error("Failed to remove favorite");
  }
}
