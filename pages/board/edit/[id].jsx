import { useState } from "react";
import { useRouter } from "next/router";
import EditBoard from "@/components/EditBoardComponents/EditBoard.jsx";
import { fetchArticle, updateArticle } from "@/utils/articleApi";
import styles from "./[id].module.css";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const article = await fetchArticle(id);
    return {
      props: { article },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
    };
  }
}

export default function EditArticlePage({ article }) {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: article.title || "",
    content: article.content || "",
  });
  const [isFormValid, setFormValid] = useState(false);

  const mutation = useMutation({
    mutationFn: (newData) => updateArticle(id, newData),
    onSuccess: () => {
      router.push(ROUTES.ARTICLE(id));
    },
    onError: (error) => {
      console.error("Error updating article:", error);
    },
  });

  const handleSubmit = () => {
    if (!isFormValid) return;
    mutation.mutate(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>게시글 수정하기</h2>
        <button
          className={styles.addBtn}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          수정
        </button>
      </div>
      <EditBoard
        formData={formData}
        setFormData={setFormData}
        setFormValid={setFormValid}
      />
    </div>
  );
}
