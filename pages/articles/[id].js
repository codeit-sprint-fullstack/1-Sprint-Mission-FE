import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "@/pages/api/axios";
import {
  getArticle,
  getComment,
  deleteArticle,
} from "@/services/articleService"; // 함수들을 import

export default function Article() {
  const [article, setArticle] = useState();
  const [comment, setComment] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false); // 드롭다운이 열렸는지 여부를 상태로 관리

  async function getArticle(targetId) {
    try {
      const res = await axios.get(`article/${targetId}`);
      const nextArticle = res.data;
      setArticle(nextArticle);
    } catch (error) {
      console.error("Failed to fetch article:", error);
      // 여기서 에러 처리 로직을 추가할 수 있습니다. 예를 들어, 사용자에게 에러 메시지를 표시하거나 기본값을 설정하는 등의 작업을 할 수 있습니다.
    }
  }

  async function getComment(targetId) {
    try {
      const res = await axios.get(`article/${targetId}/comment`); // 요청을 보냅니다.
      const nextComment = res.data; // 응답 데이터를 변수에 저장합니다.
      setComment(nextComment); // 상태를 업데이트합니다.
    } catch (error) {
      console.error("Failed to fetch comments:", error); // 오류가 발생한 경우 로그를 출력합니다.
    }
  }

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

    getArticle(id);
    getComment(id);
  }, [id]);

  if (!article) return null;

  function formatDate(dateString) {
    // 날짜를 포맷팅할 옵션을 지정합니다. (년, 월, 일)
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };

    // 전달받은 dateString을 Date 객체로 변환합니다.
    const date = new Date(dateString);

    // toLocaleDateString() 메서드를 사용해 날짜를 "YYYY.MM.DD" 형식으로 변환합니다.
    return date
      .toLocaleDateString("ko-KR", options) // "YYYY. MM. DD." 형식으로 반환됨
      .replace(/\./g, "") // "."(점)을 모두 제거합니다.
      .replace(/ /g, ". "); // 공백을 ". "으로 바꿔 "YYYY.MM.DD" 형식으로 만듭니다.
  }

  // 드롭다운 메뉴를 열고 닫는 함수
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 현재 상태를 반전시켜 열고 닫기 기능 구현
  };

  async function deleteArticle(targetId) {
    try {
      const res = await axios.delete(`/article/${targetId}`); // 삭제 요청 보내기
      alert("삭제되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("Failed to fetch comments:", error); // 오류가 발생한 경우 로그를 출력합니다.
    }
  }

  return (
    <>
      <div className={styles.articlePage}>
        <div className={styles.articleHeader}>
          <div className={styles.articleTitleContainer}>
            <p className={styles.articleTitle}>{article.title}</p>
            <div className={styles.articleDropdown}>
              <Image
                src="/ic_kebab.png"
                alt="ic_kebab"
                width={24}
                height={24}
                onClick={handleToggleDropdown}
                className={styles.articleDropdownBtn}
              />
              {isOpen && (
                <div className={styles.articleDropdownBox} ref={dropDownRef}>
                  <Link
                    href={`/modify/${id}`}
                    className={styles.articleDropdownBoxModify}
                  >
                    수정하기
                  </Link>
                  <button
                    className={styles.articleDropdownBoxDelete}
                    onClick={() => deleteCurrentArticle(id)}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.articleInfo}>
            <Image
              src="/ic_profile.png"
              alt="user_profile"
              width={40}
              height={40}
            />
            <span className={styles.articleNickname}>총명한 판다</span>
            <span className={styles.articleDate}>
              {formatDate(article.createdAt)}
            </span>
            <Image
              src="/btn_heart.png"
              alt="favorite_btn"
              width={87}
              height={40}
              className={styles.articleFavoriteBtn}
            />
          </div>
        </div>
        <div className={styles.articleContent}>
          <div className={styles.articleContentBody}>{article.content}</div>
        </div>
        <form className={styles.articleCommentForm} onSubmit={handleSubmit}>
          <label className={styles.articleCommentLabel}>댓글 달기</label> <br />
          <textarea
            className={styles.articleCommentInput}
            placeholder="댓글을 입력해주세요."
            value={form.content}
            onChange={handleInputChange}
          ></textarea>{" "}
          <br />
          <button
            className={styles.articleCommentBtn}
            disabled={!form.content}
            style={{
              backgroundColor: form.content ? "var(--brand-blue)" : "#9ca3af",
            }}
          >
            등록
          </button>
        </form>
        {comment && comment.length > 0 ? (
          <div className={styles.commentList}>
            {comment.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <Link href="/" className={styles.commentListBtn}>
              <Image
                src="/btn_medium.png"
                alt="route_list"
                width={240}
                height={48}
              />
            </Link>
          </div>
        ) : (
          <div className={styles.noComment}>
            <Image
              src="/nothing_comment.png"
              alt="nothing_comment"
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
