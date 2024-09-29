import ArticleForm from "@/components/form/ArticleForm";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import { useCreateMutation } from "@/service/mutations";
import { ENTITY } from "@/variables/entities";

export default function CreateArticle() {
  const entity = ENTITY.ARTICLE;

  const { isPending, isError, mutate, error } = useCreateMutation({
    entity,
  });

  const handleNewArticleSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    mutate(formData);
  };

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  return <ArticleForm onSubmit={handleNewArticleSubmit} />;
}
