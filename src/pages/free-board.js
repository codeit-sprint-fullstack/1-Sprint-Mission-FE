"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import searchIcon from "../../public/images/ic_search.png";
import FreeBoardPageHeader from "../components/FreeBoardPageHeader";
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
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const {
    posts,
    hasNext,
    loadingError,
    totalPages,
    fetchPosts,
    loading: apiLoading,
  } = usePostList(order, (currentPage - 1) * LIMIT);

  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    if (!searchPosts.trim()) {
      fetchPosts(currentPage);
    } else {
      handleSearchClick(); // 검색어가 있을 때 검색 실행
    }
  }, [searchPosts, order, currentPage]);

  useEffect(() => {
    if (!searchPosts.trim()) {
      fetchPosts(currentPage);
    }
  }, [order, currentPage]);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setCurrentPage(1); // Reset to first page on order change
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
    if (searchPosts.trim() === "") {
      setSearchResults([]);
      setSearchError("⚠ 검색어를 입력해 주세요.");
      return;
    }

    // 검색어에 맞는 게시글 필터링
    const results = filterPostsByName(posts, searchPosts);

    if (results.length === 0) {
      setSearchResults([]);
      setSearchError("게시글이 존재하지 않습니다.");
    } else {
      setSearchResults(results);
      setSearchError(null);
    }
  }, [searchPosts, posts]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    if (!searchPosts.trim()) {
      fetchPosts(page);
    }
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

  const currentPagePosts = useMemo(() => {
    return sortedPosts.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
  }, [sortedPosts, currentPage]);

  return (
    <div className={styles.App}>
      <FreeBoardPageHeader />
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
        {loading && <div>로딩 중...</div>}
        {loadingError && !loading && (
          <div className={styles.searchError}>{loadingError}</div>
        )}
        {searchError && <div className={styles.searchError}>{searchError}</div>}
        {searchPosts && searchResults.length > 0 && !searchError && (
          <div className={styles.searchResults}>
            <h3>검색 결과</h3>
            <ul>
              {searchResults.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
            <PostList posts={searchResults} />
          </div>
        )}
        {!searchPosts && !loading && !searchError && (
          <>
            <PostList posts={currentPagePosts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageClick}
              hasNext={hasNext}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
