import styles from "./ItemChat.module.css";
import Chat from "./Chat";

export default function ItemChat({ comments }) {
  return (
    <>
      <div className={styles.addChatContainer}>
        <p className={styles.addText}>문의하기</p>
        <textarea
          className={styles.inputChat}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <button className={styles.addBtn}>등록</button>
      </div>
      <Chat comments={comments} />
    </>
  );
}
