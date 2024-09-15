import { createArticle } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import ArticleForm from "@/components/form/ArticleForm";
import { useRouter } from "next/router";
import Msg from "@/components/ui/Msg";

export default function CreateArticle() {
  const router = useRouter();
  const { articleId } = router.query;

  const {
    isPending,
    isError,
    error,
    data: article,
  } = useQuery({
    queryKey: ["article", { articleId }],
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
  });

  const articleMutation = useMutation({
    mutationFn: (newArticle) => createArticle(newArticle),
    onError: (error) => {
      console.error(error);
      <Msg type="error" msg={error} />;
    },
  });

  const handleNewArticleSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    console.log(data);
    articleMutation.mutate(formData);
  };

  return <ArticleForm onSubmit={handleNewArticleSubmit} />;
}
