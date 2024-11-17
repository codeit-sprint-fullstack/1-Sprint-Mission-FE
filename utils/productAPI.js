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

    return {
      products: response.data.list || [],
      totalCount: response.data.totalCount || 0,
      currentPage: page,
      totalPages: Math.ceil((response.data.totalCount || 0) / pageSize),
      hasNextPage: page * pageSize < (response.data.totalCount || 0),
    };
  } catch (error) {
    handleApiError(error);
  }
};

export const addProduct = async (product) => {
  try {
    const response = await productApi.post("/products", product);
    return response.data;
  } catch (error) {
    handleApiError(error);
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
    handleApiError(error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await productApi.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const searchProducts = async (query, page = 1) => {
  try {
    const response = await productApi.get("/products/search", {
      params: { q: query, page, limit: ITEMS_PER_PAGE },
    });
    return {
      products: response.data.list,
      totalCount: response.data.totalCount,
      currentPage: page,
      totalPages: Math.ceil(response.data.totalCount / ITEMS_PER_PAGE),
      hasNextPage: page * ITEMS_PER_PAGE < response.data.totalCount,
    };
  } catch (error) {
    handleApiError(error);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await productApi.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
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
    console.error("좋아요 토글중 에러:", error);
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
      products: response.data.list,
      totalCount: response.data.totalCount,
      currentPage: page,
      totalPages: Math.ceil(response.data.totalCount / ITEMS_PER_PAGE),
      hasNextPage: page * ITEMS_PER_PAGE < response.data.totalCount,
    };
  } catch (error) {
    handleApiError(error);
  }
};

export const searchProductsByTag = async (tag, page = 1) => {
  try {
    const response = await productApi.get("/products/tag", {
      params: { tag, page, limit: ITEMS_PER_PAGE },
    });
    return {
      products: response.data.list,
      totalCount: response.data.totalCount,
      currentPage: page,
      totalPages: Math.ceil(response.data.totalCount / ITEMS_PER_PAGE),
      hasNextPage: page * ITEMS_PER_PAGE < response.data.totalCount,
    };
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserProducts = async (userId, page = 1) => {
  try {
    const response = await productApi.get(`/users/${userId}/products`, {
      params: { page, limit: ITEMS_PER_PAGE },
    });
    return {
      products: response.data.list,
      totalCount: response.data.totalCount,
      currentPage: page,
      totalPages: Math.ceil(response.data.totalCount / ITEMS_PER_PAGE),
      hasNextPage: page * ITEMS_PER_PAGE < response.data.totalCount,
    };
  } catch (error) {
    handleApiError(error);
  }
};
