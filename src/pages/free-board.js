"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import searchIcon from "../../public/images/ic_search.png";
import ItemsPageHeader from "../components/ItemsPageHeader";
import { useRouter } from "next/router";
import PostList from "../components/PostList";
import { filterPostsByName } from "../api/api";
import BestPostsList from "../components/BestPostsList";
import Pagination from "../components/Pagination";
import usePostList from "../hooks/usePostList";
import { LIMIT } from "../constants";
import Footer from "../components/Footer";
import styles from "./FreeBoardPage.module.css"; // CSS 모듈 import

export default function FreeBoardPage() {
  const router = useRouter();
  const [order, setOrder] = useState("createdAt");
  const [searchPosts, setSearchPosts] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { posts, hasNext, loadingError, totalPages, fetchPosts } = usePostList(
    order,
    (currentPage - 1) * LIMIT
  );

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setCurrentPage(1);
    fetchPosts(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchChange = (event) => {
    setSearchPosts(event.target.value);
  };

  const handleSearchClick = useCallback(() => {
    try {
      if (searchPosts.trim() === "") {
        setSearchResults([]);
        setSearchError("⚠ 검색어를 입력해 주세요.");
        return;
      }
      const results = filterPostsByName(posts, searchPosts);

      if (results.length === 0) {
        setSearchResults([]);
        setSearchError("게시글이 존재하지 않습니다.");
      } else {
        setSearchResults(results);
        setSearchError(null);
      }
    } catch (error) {
      setSearchError("검색 중 오류가 발생했습니다.");
      console.error("검색 오류", error);
    }
  }, [searchPosts, posts]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchPosts(page);
  };

  const handleAddPostClick = () => {
    router.push("/post-registration");
  };

  const sortedPosts = useMemo(() => {
    if (Array.isArray(posts)) {
      if (order === "createdAt") {
        return [...posts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (order === "likeCount") {
        return [...posts].sort((a, b) => b.likeCount - a.likeCount);
      }
    }
    return [];
  }, [posts, order]);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [order, currentPage, fetchPosts]);

  const currentPagePosts = sortedPosts.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT
  );

  const displayPosts =
    searchResults.length > 0 ? searchResults : currentPagePosts;

  return (
    <div className={styles.App}>
      <ItemsPageHeader />
      <main className={styles.bestPostsContainer}>
        <div className={styles.firstContainer}>
          <BestPostsList />
        </div>
        <div className={styles.postsContainer}>
          <h2 className={styles.freeBoardH1}>게시글</h2>
          <button className={styles.postBtn} onClick={handleAddPostClick}>
            글쓰기
          </button>
        </div>
        <div className={styles.inputDrop}>
          <input
            type="text"
            placeholder="검색할 게시글을 입력해주세요"
            className={styles.freeSearchInput}
            style={{ backgroundImage: `url(${searchIcon.src})` }}
            value={searchPosts}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <select className={styles.sortDropDown} onChange={handleOrderChange}>
            <option value="createdAt">최신순</option>
            <option value="likeCount">좋아요 순</option>
          </select>
        </div>
        {searchError && <div className={styles.searchError}>{searchError}</div>}
        {searchPosts && searchResults.length > 0 && (
          <div className={styles.searchResults}>
            <h3>검색 결과</h3>
            <ul>
              {searchResults.map((post) => (
                <li key={post.id}>{post.name}</li>
              ))}
            </ul>
          </div>
        )}
        {loadingError && <span>{loadingError}</span>}
        <PostList posts={displayPosts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageClick}
          hasNext={hasNext}
        />
      </main>
      <Footer />
    </div>
  );
}
