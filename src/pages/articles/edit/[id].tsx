import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  updateArticle,
  getArticleById,
  uploadArticleImage,
} from "../../../api/articleApi";
import ImageUpload from "../../../components/ImageUpload";
import styles from "../../../styles/create.module.css";
import EditButton from "../../../components/EditButton";
import { ArticleResponse } from "../../../api/articleApi";

const EditArticle = () => {
  const router = useRouter();
  const { id: articleId } = router.query;

  const id =
    typeof articleId === "string" ? parseInt(articleId, 10) : undefined;

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const article: ArticleResponse = await getArticleById(id);
          setTitle(article.title);
          setContent(article.content);
          setImageUrls(article.images || []);
        } catch (error) {
          console.error("게시글 불러오기 중 오류 발생:", error);
        }
      }
    };

    fetchArticle();
  }, [id]);

  const handleSavePost = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (id !== undefined) {
      try {
        await updateArticle(id, { title, content, images: imageUrls });
        alert("게시글이 수정되었습니다.");
        router.replace(`/articles/${id}`);
      } catch (error) {
        console.error("게시글 수정 중 오류가 발생했습니다.", error);
        alert("게시글 수정 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form className={styles.registrationForm}>
      <div className={styles.formHeader}>
        <h2>게시글 수정하기</h2>
        {id !== undefined && (
          <EditButton
            articleId={id}
            title={title}
            content={content}
            onClick={handleSavePost}
          />
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="images">게시글 이미지</label>
        <ImageUpload
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          uploadApi={uploadArticleImage}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">*제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          style={{ height: "30px" }}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">*내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          style={{ height: "252px" }}
        />
      </div>
    </form>
  );
};

export default EditArticle;
