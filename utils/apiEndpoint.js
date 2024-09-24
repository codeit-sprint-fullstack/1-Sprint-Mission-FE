// API 엔드포인트 상수 정의
export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/auth/signIn",
    SIGN_UP: "/auth/signUp",
  },
  USERS: {
    ME: "/users/me",
  },
  PRODUCTS: {
    BASE: "/products",
    DETAIL: (id) => `/products/${id}`,
    FAVORITE: (productId) => `/products/${productId}/favorite`,
    FETCH_COMMENTS: (id, cursor) =>
      `/products/${id}/comments?limit=4&cursor=${cursor}`,
    ADD_COMMENT: (id) => `/products/${id}/comments`,
    DETAIL_COMMENT: (id) => `/comments/${id}`,
  },
};
