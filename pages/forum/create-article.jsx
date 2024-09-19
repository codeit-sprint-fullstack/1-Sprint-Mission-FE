import ArticleForm from "@/components/form/ArticleForm";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import { useCreateArticle } from "@/service/mutations";

export default function CreateArticle() {
  const { isPending, isError, mutate, error } = useCreateArticle();

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
