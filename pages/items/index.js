import React, { useState, useEffect } from "react";
import axios from "../../lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Products.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("최신순");
  const router = useRouter();
  const itemsPerPage = 10; // 한 페이지에 10개 상품 표시

  useEffect(() => {
    fetchItems(currentPage, searchKeyword, sortOption);
  }, [currentPage, searchKeyword, sortOption]);

  const fetchItems = async (page, keyword = "", sort = "최신순") => {
    setLoading(true);
    try {
      const response = await axios.get("/products", {
        params: { page, pageSize: itemsPerPage, keyword, sort },
      });
      setItems(response.data.list);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
    } catch (error) {
      console.error("상품 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchItems(1, searchKeyword, sortOption);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage =
      Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className={styles.pagination}>
        {startPage > 1 && (
          <button onClick={() => setCurrentPage(startPage - 1)}>&lt;</button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? styles.active : ""}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && (
          <button onClick={() => setCurrentPage(endPage + 1)}>&gt;</button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Nav />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>판매 중인 상품</h1>
        <div className={styles.topBar}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색할 상품을 입력해주세요"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              검색
            </button>
          </form>
          <button
            onClick={() => router.push("/items/create")}
            className={styles.createButton}
          >
            상품 등록하기
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="최신순">최신순</option>
            <option value="인기순">인기순</option>
            <option value="가격낮은순">가격낮은순</option>
            <option value="가격높은순">가격높은순</option>
          </select>
        </div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <div className={styles.productGrid}>
            {items.map((item) => (
              <Link
                href={`/items/${item.id}`}
                key={item.id}
                className={styles.productItem}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={item.images[0] || "/placeholder-image.jpg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className={styles.productName}>{item.name}</h2>
                <p className={styles.productPrice}>
                  {item.price.toLocaleString()}원
                </p>
                <p className={styles.favoriteCount}>♥ {item.favoriteCount}</p>
              </Link>
            ))}
          </div>
        )}
        {renderPagination()}
      </div>
      <Footer />
    </div>
  );
};

export default ItemsPage;
