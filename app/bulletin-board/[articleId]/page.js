import ArticleDetailClient from "./ArticleDetailClient";

export function Article({ params }) {
  const { articleId } = params;

  return (
    <div>
      <ArticleDetailClient articleId={articleId} />
    </div>
  );
}

export default Article;
