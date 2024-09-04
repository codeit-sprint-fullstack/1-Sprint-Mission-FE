import React from "react";
import styles from "./UserPostList.module.css";
import { Link } from "react-router-dom";

//리소스
import boardCardImg from "images/mock/board_card_temp.svg";
import iconHeart from "../../images/icon/ic_heart.svg";
import profile from "images/profile.svg";

// 유틸 함수
import { formatDate } from "../../utils/formatData";

function UserPostList({ dataList }) {
  const UserPostRender = (dataObject) => {
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
      <li className={styles.postContainer}>
        <Link to={`/${category}/${id}`}>
        <figure className={styles.postMain}>
          <div className={styles.postTitle}>
            {title} {/*게시물 제목*/}
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
            <span>{athorName}</span> {/* 작성자 닉네임 */}
            <div className={styles.date}>
              <span>{formatDate(createdAt)}</span> {/* 작성일 */}
            </div>
          </div>
          <div className={styles.ProductLike}>
            <img src={iconHeart} alt="좋아요" />
            <span>{like}</span> {/* 좋아요 수 */}
          </div>
        </div>
        </Link>
      </li>
    );
  };

  return (
    <ul className={styles.listContainer}>
      {dataList.map((dataObject) => (
        <UserPostRender dataObject={dataObject} />
      ))}
    </ul>
  );
}

export default UserPostList;
