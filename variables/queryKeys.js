export const articleKey = {
  all: ["articles"],
  lists: () => [...articleKey.all, "list"],
  list: (params = {}) => [...articleKey.lists(), { ...params }],
  details: () => [...articleKey.all, "detail"],
  detail: (articleId) => [...articleKey.details(), articleId],
  comments: () => [...articleKey.detail(), "comments"],
};

export const commentKey = {
  all: ["comments"],
  details: () => [...commentKey.all, "detail"],
  detail: (commentId) => [...commentKey.details(), commentId],
};

export const PAGE_SIZE = {
  DEFAULT: 10,
};
