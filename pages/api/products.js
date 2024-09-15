import instance from "./axios";

export async function getProducts(params = {}) {
  try {
    const res = await instance.get("/products", { params });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // 에러를 호출자에게 전달
  }
}

export async function getProduct(id) {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    throw error; // 에러를 호출자에게 전달
  }
}

export async function updateProduct(id, item) {
  try {
    const res = await instance.patch(`/products/${id}`, item);
    return res.data;
  } catch (error) {
    console.error(`Failed to update product with id ${id}:`, error);
    throw error; // 에러를 호출자에게 전달
  }
}

export async function createProduct(item) {
  try {
    const res = await instance.post(`/products`, item);
    return res.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error; // 에러를 호출자에게 전달
  }
}

export async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res.status;
  } catch (error) {
    console.error(`Failed to delete product with id ${id}:`, error);
    throw error; // 에러를 호출자에게 전달
  }
}
