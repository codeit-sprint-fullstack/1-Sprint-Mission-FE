import ArticleEdit from "./articleEdit.js";
import { getArticle } from "@/lib/axios.js";

async function getArticleData(articleId) {
  const data = await getArticle(articleId);
  return await data;
}

export async function ArticleEditPage({ params }) {
  const { articleId } = params;

  const data = await getArticleData(articleId);

  return (
    <div>
      <ArticleEdit articleId={articleId} data={data} />
    </div>
  );
}

export default ArticleEditPage;
