"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import searchIcon from "../public/images/ic_search.png";
import ItemsPageHeader from "../components/ItemsPageHeader";
import PostList from "../components/PostList";
import BestPostsList from "../components/BestPostsList";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { filterPostsByName } from "../api/api";
import usePostList from "../hooks/usePostList";
import { LIMIT } from "../constants";

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

  useEffect(() => {
    fetchPosts(currentPage);
  }, [order, currentPage, fetchPosts]);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setCurrentPage(1); // 정렬 순서 변경 시 첫 페이지로 이동
    fetchPosts(1); // 첫 페이지의 데이터 새로고침
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(); // 엔터키로 검색 실행
    }
  };

  const handleSearchChange = (event) => {
    setSearchPosts(event.target.value); // 검색 입력 값 변경
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
    fetchPosts(page); // 페이지 변경 시 데이터 새로고침
  };

  const handleAddPostClick = () => {
    router.push("/post-registration"); // 글쓰기 페이지로 이동
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
    return []; // posts가 배열이 아닐 경우 빈 배열 반환
  }, [posts, order]);

  const currentPagePosts = sortedPosts.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT
  );

  const displayPosts =
    searchResults.length > 0 ? searchResults : currentPagePosts;

  return (
    <div className="App">
      <ItemsPageHeader />
      <main className="bestPostsContainer">
        <div className="firstContainer">
          <BestPostsList />
        </div>
        <div className="postsContainer">
          <h2>게시글</h2>
          <button className="postBtn" onClick={handleAddPostClick}>
            글쓰기
          </button>
        </div>
        <div className="inputDrop">
          <input
            type="text"
            placeholder="검색할 게시글을 입력해주세요"
            className="freeSearchInput"
            style={{ backgroundImage: `url(${searchIcon.src})` }}
            value={searchPosts}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <select className="sortDropDown" onChange={handleOrderChange}>
            <option value="createdAt">최신순</option>
            <option value="likeCount">좋아요 순</option>
          </select>
        </div>
        {searchError && <div className="search-error">{searchError}</div>}
        {searchPosts && searchResults.length > 0 && (
          <div className="search-results">
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
