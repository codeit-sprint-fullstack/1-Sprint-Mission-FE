export const articleKey = {
  all: ["articles"],
  list: (params = {}) => [...articleKey.all, { ...params }],
  detail: (articleId) => ["article", articleId],
  commentList: (articleId) => [...articleKey.detail(articleId), "comments"],
};

export const commentKey = {
  all: ["comments"],
  detail: (commentId) => ["comment", commentId],
};

export const PAGE_SIZE = {
  DEFAULT: 10,
};
