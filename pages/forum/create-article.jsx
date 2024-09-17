import { createArticle } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ArticleForm from "@/components/form/ArticleForm";
import { useRouter } from "next/router";
import { articleKey } from "@/variables/queryKeys";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";

export default function CreateArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const articleMutation = useMutation({
    mutationFn: (newArticle) => createArticle(newArticle),
    onSuccess: (data) => {
      if (data.id) {
        router.push(`/forum/${data.id}`);
      }

      queryClient.invalidateQueries(articleKey.lists());
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleNewArticleSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    articleMutation.mutate(formData);
  };

  if (articleMutation.isPending) return <Loader />;
  if (articleMutation.isError) {
    const errMsg = articleMutation.error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  return <ArticleForm onSubmit={handleNewArticleSubmit} />;
}
