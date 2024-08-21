import React from "react";
import styles from "./BestCard.module.css";
import { Link } from "react-router-dom";

//리소스
import boardCardImg from "images/mock/board_card_temp.svg";
import iconHeart from "../../images/icon/ic_heart.svg";
import bestBadge from "images/badge/img_badge.svg";

function BestCard({ dataObject }) {
  return (
    <article className={styles.cardContainer}>
      {/* <Link to={`/freeboard/${board.boardId}`}> */}
      <div className={styles.badge}>
        <img src={bestBadge} alt="badge" />
      </div>
      <figure className={styles.cardMain}>
        <div className={styles.cardTitle}>
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </div>
        <div className={styles.imgSizeControl}>
          <img src={boardCardImg} alt="board_card" />
        </div>
      </figure>
      <div className={styles.cardInfo}>
        <div className={styles.writerProduckLike}>
          <span>총명한 판다</span>
          <div className={styles.ProductLike}>
            <img src={iconHeart} alt="좋아요" />
            <span>9999+</span>
          </div>
        </div>
        <div className={styles.date}>
          <span>2024. 04. 16</span>
        </div>
      </div>
      {/* </Link> */}
    </article>
  );
}

export default BestCard;
