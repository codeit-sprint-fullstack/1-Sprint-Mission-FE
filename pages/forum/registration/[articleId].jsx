import ArticleForm from "@/components/form/ArticleForm";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import { useUpdateMutation } from "@/service/mutations";
import { useGetById } from "@/service/queries";
import { ENTITY } from "@/variables/entities";
import { useRouter } from "next/router";

export default function EditArticlePage() {
  const entity = ENTITY.ARTICLE;
  const router = useRouter();
  const { articleId } = router.query;
  const {
    isError,
    error,
    data: article,
    isPending,
  } = useGetById({
    entity,
    id: articleId,
  });

  const { mutate } = useUpdateMutation({ entity, id: articleId });

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  const handleNewArticleSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    mutate(formData);
  };

  return (
    <>
      <ArticleForm
        onSubmit={handleNewArticleSubmit}
        initialData={article}
        isEditMode={true}
      />
    </>
  );
}
