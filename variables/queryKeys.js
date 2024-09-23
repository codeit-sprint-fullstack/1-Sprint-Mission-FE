export const articleKey = {
  all: ["articles"],
  lists: () => [...articleKey.all, "list"],
  list: (params = {}) => [...articleKey.lists(), { ...params }],
  details: () => [...articleKey.all, "detail"],
  detail: (articleId) => [...articleKey.details(), articleId],
  comments: (articleId) => [...articleKey.detail(articleId), "comments"],
};

export const commentKey = {
  all: ["comments"],
  details: () => [...commentKey.all, "detail"],
  detail: (commentId) => [...commentKey.details(), commentId],
};

export const productKey = {
  all: ["products"],
  lists: () => [...productKey.all, "list"],
  list: (params = {}) => [...productKey.lists(), { ...params }],
  details: () => [...productKey.all, "detail"],
  detail: (productId) => [...productKey.details(), productId],
  comments: (productId) => [...productKey.detail(productId), "comments"],
};

export const userKey = {
  all: ["users"],
  detail: (userId) => [...userKey.all, userId],
  products: () => [...userKey.detail(), "product"],
  product: (productId) => [...userKey.products(), productId],
};

export const PAGE_SIZE = {
  DEFAULT: 10,
};
