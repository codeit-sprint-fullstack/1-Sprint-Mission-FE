import ArticleDetailClient from "./ArticleDetailClient";

import style from "./article-page.module.css";

export function ArticlePage({ params }) {
  const { articleId } = params;

  return (
    <div className={style.main}>
      <ArticleDetailClient articleId={articleId} />
    </div>
  );
}

export default ArticlePage;
