import { updateArticle, getArticleById } from "@/service/api/article";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ArticleForm from "@/components/form/ArticleForm";
import { useRouter } from "next/router";
import { articleKey } from "@/variables/queryKeys";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";

export default function EditArticle() {
  const router = useRouter();
  const { articleId } = router.query;
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    error,
    data: article,
  } = useQuery({
    queryKey: articleKey.detail(articleId),
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
  });

  const updateArticleMutation = useMutation({
    mutationFn: (updateData) => updateArticle(articleId, updateData),
    onSuccess: (data) => {
      if (data.id) {
        router.push(`/forum/${data.id}`);
      }
      queryClient.invalidateQueries({ queryKey: articleKey.lists() });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  const handleNewArticleSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    updateArticleMutation.mutate(formData);
  };

  return (
    <ArticleForm
      onSubmit={handleNewArticleSubmit}
      initialData={article}
      isEditMode={true}
    />
  );
}
