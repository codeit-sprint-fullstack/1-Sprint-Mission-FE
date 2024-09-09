import { useRouter } from "next/router";
import { useState } from "react"; // 부모 컴포넌트에서 상태 관리
import EditBoard from "@/components/EditBoardComponents/EditBoard";
import { fetchArticle, updateArticle } from "@/utils/articleApi";
import styles from "./[id].module.css";

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

  const handleSubmit = async () => {
    if (!isFormValid) return;
    try {
      await updateArticle(id, formData);
      router.push(`/board/${id}`);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        onChange={handleChange}
        setFormValid={setFormValid}
      />
    </div>
  );
}
