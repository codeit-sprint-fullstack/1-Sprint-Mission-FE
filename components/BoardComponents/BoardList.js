import styles from "./BoardList.module.css";
import SearchBar from "@/components/BoardComponents/SearchBar";
import BoardListItems from "@/components/BoardComponents/BoardListItems";

export default function BoardList() {
  return (
    <>
      <div className={styles.createContainer}>
        <h3>게시글</h3>
        <button className={styles.createBtn}>글쓰기</button>
      </div>
      <SearchBar />
      <BoardListItems />
    </>
  );
}
