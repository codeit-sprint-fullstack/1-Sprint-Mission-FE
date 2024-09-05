"use client";

import React, { useState } from "react";
import ItemsPageHeader from "../components/ItemsPageHeader";
import styles from "./FreeBoardPage.module.css";

export default function FreeBoardPage() {
  return (
    <div className={styles.freeBoardPage}>
      <ItemsPageHeader />
      <div className={styles.bestPostsContainer}>
        <h1>베스트 게시글</h1>
        <div className={styles.bestPosts}></div>
        <div className={styles.postsContainer}>
          <h2>게시글</h2>
          <button className={styles.postBtn} onClick={handleAddPostClick}>
            글쓰기
          </button>
        </div>
        <div className={styles.searchBarDropdown}>
          {/* 검색창 */}
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className={styles.searchInput}
            style={{ backgroundImage: `url(/images/ic_search.png)` }} // public/images 폴더에서 이미지 접근
            value={searchProduct}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          {/* 드롭 다운 */}
          <select className={styles.sortDropDown} onChange={handleOrderChange}>
            <option value="createdAt">최신순</option>
            <option value="likes">좋아요순</option>
          </select>
        </div>
      </div>
    </div>
  );
}
