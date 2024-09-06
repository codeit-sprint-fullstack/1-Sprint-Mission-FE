// 기본
import React from "react";
import styles from "./UserPostList.module.css";

// 추가
import Link from "next/link";

// 유틸 함수
import { formatDate } from "../../utils/formatData";

//리소스
const boardCardImg = "/images/default/default_board_card.svg";
const iconHeart = "/images/icon/ic_heart.svg";

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
        <Link href={`/${category}/${id}`}>
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
