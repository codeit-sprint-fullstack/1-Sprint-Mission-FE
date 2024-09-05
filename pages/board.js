import BestProduct from "@/components/BoardComponents/BestProduct";
import BoardList from "@/components/BoardComponents/BoardList";
import styles from "@/styles/board.module.css";

export default function Board() {
  return (
    <div className={styles.bestContainer}>
      <BestProduct />
      <BoardList />
    </div>
  );
}
