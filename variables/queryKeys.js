export const QUERY_KEY = {
  ARTICLES: "articles",
  ARTICLE: (articleId) => ["article", { articleId }],
};

export const PARAMS = {
  PAGE_SIZE: {
    DEFAULT: 10,
  },
};
