import { productApi } from "./clients";
import { handleApiError } from "./apiErrorHandler";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

export const getProducts = async ({
  page = 1,
  pageSize = ITEMS_PER_PAGE,
  orderBy = "recent",
  keyword = "",
}) => {
  try {
    const response = await productApi.get("/products", {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
      },
    });

    console.log("API응답:", response.data);

    if (!response.data || !Array.isArray(response.data.products)) {
      throw new Error("Unexpected API response structure");
    }

    return {
      products: response.data.products,
      totalCount: response.data.totalCount,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      hasNextPage: response.data.hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    handleApiError(error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await productApi.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    handleApiError(error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const requestBody = {
      images: product.images,
      tags: product.tags,
      price: product.price,
      description: product.description,
      name: product.name,
    };

    const response = await productApi.patch(`/products/${id}`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    handleApiError(error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await productApi.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    handleApiError(error);
    throw error;
  }
};

export const searchProducts = async (query, page = 1) => {
  try {
    const response = await productApi.get("/products/search", {
      params: { q: query, page, limit: ITEMS_PER_PAGE },
    });
    return {
      products: response.data.products,
      totalCount: response.data.totalCount,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      hasNextPage: response.data.hasNextPage,
    };
  } catch (error) {
    console.error("Error searching products:", error);
    handleApiError(error);
    throw error;
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await productApi.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    handleApiError(error);
    throw error;
  }
};

export const toggleFavorite = async (productId) => {
  try {
    const productResponse = await productApi.get(`/products/${productId}`);
    const isFavorite = productResponse.data.isFavorite;

    let response;
    if (isFavorite) {
      response = await productApi.delete(`/products/${productId}/favorite`);
    } else {
      response = await productApi.post(`/products/${productId}/favorite`);
    }

    return response.data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    handleApiError(error);
    throw error;
  }
};

export const getFavoriteProducts = async (page = 1) => {
  try {
    const response = await productApi.get("/user/favorites", {
      params: { page, limit: ITEMS_PER_PAGE },
    });
    return {
      products: response.data.products,
      totalCount: response.data.totalCount,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      hasNextPage: response.data.hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    handleApiError(error);
    throw error;
  }
};

export const searchProductsByTag = async (tag, page = 1) => {
  try {
    const response = await productApi.get("/products/tag", {
      params: { tag, page, limit: ITEMS_PER_PAGE },
    });
    return {
      products: response.data.products,
      totalCount: response.data.totalCount,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      hasNextPage: response.data.hasNextPage,
    };
  } catch (error) {
    console.error("Error searching products by tag:", error);
    handleApiError(error);
    throw error;
  }
};

export const getUserProducts = async (userId, page = 1) => {
  try {
    const response = await productApi.get(`/users/${userId}/products`, {
      params: { page, limit: ITEMS_PER_PAGE },
    });
    return {
      products: response.data.products,
      totalCount: response.data.totalCount,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      hasNextPage: response.data.hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching user products:", error);
    handleApiError(error);
    throw error;
  }
};
