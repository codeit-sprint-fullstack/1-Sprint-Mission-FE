export const ROUTES = {
  HOME: "/",
  BOARD: "/board",
  CREATE_BOARD: "/createBoard",
  BOARD_EDIT: (id: number | string) => `/board/edit/${id}`,
  ARTICLE: (id: number | string) => `/board/${id}`,
  ITEMS: "/items",
  ITEMS_DETAIL: (id: number | string) => `/items/${id}`,
  LOGIN: "/login",
  SIGNIN: "/signin",
  CREATE_PRODUCT: "/createProduct",
  ITEMS_EDIT: (id: number | string) => `/items/edit/${id}`,
};
