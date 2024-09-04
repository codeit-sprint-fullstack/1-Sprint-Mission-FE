import React from "react";
import styles from "./BestPostCardList.module.css";
import { Link } from "react-router-dom";

//리소스
import boardCardImg from "images/mock/board_card_temp.svg";
import iconHeart from "../../images/icon/ic_heart.svg";
import bestBadge from "images/badge/img_badge.svg";

//유틸 함수
import { formatDate } from "../../utils/formatData";

function BestCardList({ dataList }) {
  const BestCardRender = (dataObject) => {
    const {
      id,
      category,
      title,
      // content,
      createdAt,
      like,
      athorName,
      // commentcount,
    } = dataObject;
    return (
      <article className={styles.cardContainer}>
        <Link to={`/${category}}/${id}`}>
          {" "}
          {/* 클릭 시 게시물로 링크 이동 */}
          <div className={styles.badge}>
            <img src={bestBadge} alt="badge" />
          </div>
          <figure className={styles.cardMain}>
            <div className={styles.cardTitle}>
              {title} {/* 게시물 제목 */}
            </div>
            <div className={styles.imgSizeControl}>
              <img src={boardCardImg} alt="board_card" />
            </div>
          </figure>
          <div className={styles.cardInfo}>
            <div className={styles.writerProduckLike}>
              <span>{athorName}</span> {/* 작성자 닉네임 */}
              <div className={styles.ProductLike}>
                <img src={iconHeart} alt="좋아요" />
                <span>{like > 9999 ? "9999+" : like}</span> {/* 좋아요 수 */}
              </div>
            </div>
            <div className={styles.date}>
              <span>{formatDate(createdAt)}</span> {/* 작성일 */}
            </div>
          </div>
        </Link>
      </article>
    );
  };

  // 최종 렌더링
  return (
    <div className={styles.listContainer}>
      {dataList.map((dataObject) => (
        <BestCardRender dataObject={dataObject} />
      ))}
    </div>
  );
}

export default BestCardList;
