export const ROUTES = {
  HOME: "/",
  BOARD: "/board",
  CREATE_BOARD: "/createBoard",
  BOARD_EDIT: (id) => `/board/edit/${id}`,
  ARTICLE: (id) => `/board/${id}`,
  ITEMS: "/items",
  ITEMS_DETAIL: (id) => `/items/${id}`,
  LOGIN: "/login",
  SIGNIN: "/signin",
  CREATE_PRODUCT: "/createProduct",
  ITEMS_EDIT: (id) => `/items/edit/${id}`,
};
