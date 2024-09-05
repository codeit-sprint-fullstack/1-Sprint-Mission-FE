import styles from "../styles/Home.module.css";
import BestItem from "../components/BestItem/BestItem";
import Postview from "../components/postView/Postview";
import Image from "next/image";
import { useState, useCallback } from "react";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownValue, setdropdownValue] = useState("최신 순");

  const handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const handdleOption = (option) => {
    setIsOpen(!isOpen);
    setdropdownValue(option);
  };

  return (
    <>
      <div className={styles.HomeContainer}>
        <div className={styles.ContainerGrid}>
          <div className={styles.ContainerGridTitle}>
            <p>베스트 게시글</p>
          </div>
          <div className={styles.BestItemContainer}>
            {/* 여기 map써서 사용해야할듯 */}
            <BestItem />
            <BestItem />
            <BestItem />
          </div>
          <div className={styles.ContentTitle}>
            <p>게시글</p>
            <button className={styles.ContentBtn}>글쓰기</button>
          </div>
          <div className={styles.ContentPost}>
            <input
              className={styles.ContentInput}
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            ></input>
            <Image
              src="search.svg"
              width={24}
              height={24}
              className={styles.SearchImg}
            />
            <div className={styles.dropdown}>
              <p className={styles.toggle} onClick={handletoggle}>
                {dropdownValue}
                <Image src="dropdown.svg" width={24} height={24} />
              </p>
              {isOpen && (
                <ul className={styles.menu}>
                  <li onClick={() => handdleOption("최신 순")}>최신 순</li>
                  <li onClick={() => handdleOption("좋아요 순")}>좋아요 순</li>
                </ul>
              )}
            </div>
          </div>
          <div className={styles.ContentItem}>
            <Postview />
            <Postview />
          </div>
        </div>
      </div>
    </>
  );
}
