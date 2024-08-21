import React from "react";
import styles from "./UserPost.module.css";
// import { Link } from "react-router-dom";

//리소스
import boardCardImg from "images/mock/board_card_temp.svg";
import iconHeart from "../../images/icon/ic_heart.svg";
import profile from "images/profile.svg";

function UserPost({ dataObject }) {
  return (
    <li className={styles.postContainer}>
      {/* <Link to={`/freeboard/${board.boardId}`}> */}
      <figure className={styles.cardInfoBox}>
        <div className={styles.postTitle}>
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </div>
        <div className={styles.imgSizeControl}>
          <img src={boardCardImg} alt="board_card" />
        </div>
      </figure>
      <div className={styles.boardInfo}>
        <div className={styles.postInfo}>
          <div className={styles.profile}>
            <img src={profile} alt="profile" />
          </div>
          <span>총명한 판다</span>
          <div className={styles.date}>
            <span>2024. 04. 15</span>
          </div>
        </div>
        <div className={styles.ProductLike}>
          <img src={iconHeart} alt="좋아요" />
          <span>9999+</span>
        </div>
      </div>
      {/* </Link> */}
    </li>
  );
}

export default UserPost;
