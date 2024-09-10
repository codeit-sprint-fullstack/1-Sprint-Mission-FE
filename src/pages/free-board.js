import React, { useEffect, useState, useMemo, useCallback } from "react";
import searchIcon from "../../public/images/ic_search.png";
import FreeBoardPageHeader from "../components/FreeBoardPageHeader";
import { useRouter } from "next/router";
import PostList from "../components/PostList";
import { filterPostsByName } from "../api/api";
import BestPostsList from "../components/BestPostsList";
import usePostList from "../hooks/usePostList";
import { LIMIT } from "../constants";
import Footer from "../components/Footer";
import styles from "./FreeBoardPage.module.css"; // CSS 모듈 import
import Spinner from "../components/Spinner"; // Spinner import

export default function FreeBoardPage() {
  const router = useRouter();
  const [order, setOrder] = useState("createdAt");
  const [searchPosts, setSearchPosts] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const {
    posts,
    hasNext,
    loadingError,
    fetchPosts,
    loading: apiLoading,
  } = usePostList(order);

  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    if (!searchPosts.trim()) {
      fetchPosts(); // 초기 로드
    } else {
      handleSearchClick(); // 검색어가 있을 때 검색 실행
    }
  }, [searchPosts, order]);

  useEffect(() => {
    if (!searchPosts.trim()) {
      fetchPosts(); // 초기 로드
    }
  }, [order]);

  // 스크롤 이벤트 핸들러 추가
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 페이지 하단에 도달했을 때
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // 현재 로딩 중이지 않고, 추가 데이터가 있는 경우
        if (!loading && hasNext) {
          fetchPosts(true); // 데이터 추가 로드
        }
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasNext, fetchPosts]);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setSearchResults([]);
    setSearchPosts(""); // 정렬 변경 시 검색 결과 초기화
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
      setSearchError("⚠ 게시글이 존재하지 않습니다.");
    } else {
      setSearchResults(results);
      setSearchError(null);
    }
  }, [searchPosts, posts]);

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

  // 검색 결과 또는 전체 게시글 리스트
  const displayPosts = searchPosts ? searchResults : sortedPosts;

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
        {loading && <Spinner />}
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
            <PostList posts={displayPosts} />
            {!hasNext && (
              <div className={styles.noMorePosts}>
                더 이상 게시글이 없습니다.
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
