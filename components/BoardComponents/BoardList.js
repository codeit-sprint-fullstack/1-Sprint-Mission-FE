import styles from "./BoardList.module.css";
import SearchBar from "@/components/BoardComponents/SearchBar";
import BoardListItems from "@/components/BoardComponents/BoardListItems";
import Link from "next/link";

export default function BoardList() {
  return (
    <>
      <div className={styles.createContainer}>
        <h3>게시글</h3>
        <Link href="/createBoard">
          <button className={styles.createBtn}>글쓰기</button>
        </Link>
      </div>
      <SearchBar />
      <BoardListItems />
    </>
  );
}
