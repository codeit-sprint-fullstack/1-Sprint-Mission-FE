import ArticleTemplate from './ArticleTemplate';

export default function BestAritcle({ article }) {
  return (
    <>
      {article.map((article) => {
        return <ArticleTemplate article={article} isBest={true} />;
      })}
    </>
  );
}
