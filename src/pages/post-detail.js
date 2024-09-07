import FreeBoardPageHeader from "../components/FreeBoardPageHeader"; // 자유게시판 헤더
import PostDetail from "../components/PostDetail";
import styles from "./PostDetailPage.module.css"; // css 모듈 파일 import

export default function PostDetailPage() {
  return (
    <div>
      <FreeBoardPageHeader />
      <main className={styles.main}>
        <PostDetail />
      </main>
    </div>
  );
}
