export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/auth/signIn",
    SIGN_UP: "/auth/signUp",
    REFRESH: "/auth/refresh-token",
  },
  USERS: {
    ME: "/users/me",
  },
  PRODUCTS: {
    BASE: "/products",
    FETCH_PRODUCTS: (params: string): string => `/products?${params}`,
    DETAIL: (id: number | string): string => `/products/${id}`,
    FAVORITE: (productId: number | string): string =>
      `/products/${productId}/favorite`,
    FETCH_COMMENTS: (
      productId: number | string,
      cursor: number | string
    ): string => `/products/${productId}/comments?limit=4&cursor=${cursor}`,
    ADD_COMMENT: (id: number | string): string => `/products/${id}/comments`,
    DETAIL_COMMENT: (id: number | string): string => `/comments/${id}`,
  },
  IMAGES: {
    UPLOAD: "/images/upload",
  },
};
