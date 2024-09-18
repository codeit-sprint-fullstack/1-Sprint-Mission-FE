import { useState, useEffect } from "react";
import axios from "@/pages/api/axios";
import Article from "./Article";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleList.module.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 검색어 변경 시 0.5초 후에 검색 쿼리를 업데이트하여 API 호출을 제어합니다.
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // orderBy 또는 searchQuery가 변경될 때마다 게시글을 가져옵니다.
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/article", {
          params: {
            order: orderBy,
            keyword: searchQuery,
            pageSize: 6,
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.error("게시글을 가져오는 중 오류 발생:", error);
      }
    };

    fetchArticles();
  }, [orderBy, searchQuery]);

  // 드롭다운 메뉴 토글
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 정렬 순서 변경
  const handleOrderByRecent = () => {
    setOrderBy("recent");
    setIsOpen(false);
  };

  const handleOrderByOldest = () => {
    setOrderBy("oldest");
    setIsOpen(false);
  };

  return (
    <div className={styles.articleList}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>게시글</p>
        <Link href="/registPage" className={styles.writeButton}>
          글쓰기
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <Image
          src="/ic_search.png"
          className={styles.searchIcon}
          width={24}
          height={24}
          alt="검색"
        />
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.dropdown} onClick={toggleDropdown}>
          {orderBy === "recent" ? "최신순" : "오래된순"}
          <Image
            src="/ic_arrow_down.png"
            width={20}
            height={20}
            alt="토글"
            className={isOpen ? styles.dropdownIconOpen : styles.dropdownIcon}
          />
          {isOpen && (
            <div className={styles.dropdownMenu}>
              <div
                className={styles.dropdownItem}
                onClick={handleOrderByRecent}
              >
                최신순
              </div>
              <div
                className={styles.dropdownItem}
                onClick={handleOrderByOldest}
              >
                오래된순
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.articleCards}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
