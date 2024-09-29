import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getArticle, getArticleComment } from "@/lib/api";
import Image from "next/image";
import styles from "@/styles/Article.module.css";
import Link from "next/link";
import Comment from "@/components/comment";
import formatDate from "@/utils/formatDate";

export default function Article() {
  const [form, setForm] = useState({ content: "" });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dropDownRef = useRef(null);

  const { data: article, refetch: refetchArticle } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id),
    enabled: !!id,
  });

  const { data: comment, refetch: refetchComment } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getArticleComment(id),
    enabled: !!id,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    refetchArticle();
    refetchComment();
  }, [id, refetchArticle, refetchComment]);

  if (!article) return null;

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  async function deleteArticle(targetId) {
    const res = await axios.delete(`/article/${targetId}`);
    alert("삭제되었습니다.");
    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/comment", {
        content: form.content,
        articleId: article.id,
      });
      const { id } = response.data;
      window.location.reload();
    } catch (error) {
      console.error("댓글 등록에 실패했습니다.", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, content: e.target.value });
  };

  return (
    <>
      <div className={styles.article_page}>
        <div className={styles.article_header}>
          <div className={styles.article_title_container}>
            <p className={styles.article_title}>{article.title}</p>
            <div className={styles.article_title_dropdown}>
              <Image
                src="/ic_kebab.png"
                alt="ic_kebab"
                width={24}
                height={24}
                onClick={toggleDropDown}
                className={styles.article_title_dropdown_btn}
              />
              {isOpen && (
                <div
                  className={styles.article_title_dropdown_box}
                  ref={dropDownRef}
                >
                  <Link
                    href={`/modify/${id}`}
                    className={styles.article_title_dropdown_box_modify}
                  >
                    수정하기
                  </Link>
                  <button
                    className={styles.article_title_dropdown_box_delete}
                    onClick={() => deleteArticle(id)}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.article_information}>
            <Image
              src="/ic_profile.png"
              alt="user_profile"
              width={40}
              height={40}
            />
            <span className={styles.article_nickname}>총명한판다</span>
            <span className={styles.article_created_date}>
              {formatDate(article.createdAt)}
            </span>
            <Image
              src="/btn_heart.png"
              alt="favorite_btn"
              width={87}
              height={40}
              className={styles.article_favorite_btn}
            />
          </div>
        </div>
        <div className={styles.article_body}>
          <div className={styles.article_body}>{article.content}</div>
        </div>
        <form className={styles.article_comment} onSubmit={handleSubmit}>
          <label className={styles.article_comment_label}>댓글달기</label>{" "}
          <br />
          <textarea
            className={styles.article_comment_input}
            placeholder="댓글을 입력해주세요."
            value={form.content}
            onChange={handleInputChange}
          ></textarea>{" "}
          <br />
          <button
            className={styles.article_comment_btn}
            disabled={!form.content}
            style={{
              backgroundColor: form.content ? "var(--brand-blue)" : "#9ca3af",
            }}
          >
            등록
          </button>
        </form>
        {comment && comment.list && comment.list.length ? (
          <div className={styles.comment_list}>
            {comment.list.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <Link href="/" className={styles.comment_list_btn}>
              <Image
                src="/btn_medium.png"
                alt="route_list"
                width={240}
                height={48}
              />
            </Link>
          </div>
        ) : (
          <div className={styles.article_no_comment}>
            <Image
              src="/no_comment.png"
              alt="no_comment"
              width={151}
              height={208}
            />
            <Link href="/">
              <Image
                src="/btn_medium.png"
                alt="route_list"
                width={240}
                height={48}
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
