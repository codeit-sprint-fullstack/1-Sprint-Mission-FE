import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EditBoard from "@/components/EditBoardComponents/EditBoard.jsx";
import { fetchArticle, updateArticle } from "@/utils/articleApi";
import styles from "./[id].module.css";
import { ROUTES } from "@/utils/rotues";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isFormValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  // 게시글 데이터 가져오기
  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const article = await fetchArticle(id);
        setFormData({
          title: article.title || "",
          content: article.content || "",
        });
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("게시글을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const mutation = useMutation({
    mutationFn: (newData) => updateArticle(id, newData),
    onSuccess: () => {
      router.push(ROUTES.ARTICLE(id));
    },
    onError: (error) => {
      console.error("Error updating article:", error);
      toast.error("게시글 수정 중 오류가 발생했습니다.");
    },
  });

  const handleSubmit = () => {
    if (!isFormValid) return;
    mutation.mutate(formData);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
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
