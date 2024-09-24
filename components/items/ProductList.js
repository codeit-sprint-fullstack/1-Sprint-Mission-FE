import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/utils/productAPI";
import styles from "./ProductList.module.css";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchProducts(true);
  }, [orderBy, keyword]);

  const fetchProducts = async (resetList = false) => {
    try {
      setLoading(true);
      const response = await getProducts({
        page: resetList ? 1 : currentPage,
        pageSize: ITEMS_PER_PAGE,
        orderBy,
        keyword,
      });
      if (resetList) {
        setProducts(response.products);
        setCurrentPage(1);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...response.products]);
      }
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      if (!resetList) {
        setCurrentPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      fetchProducts(false);
    }
  };

  const handleOrderChange = (newOrder) => {
    setOrderBy(newOrder);
    fetchProducts(true);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchProducts(true);
  };

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>제품 목록 (총 {totalCount}개)</h1>

      <div className={styles.controlsContainer}>
        <select
          value={orderBy}
          onChange={(e) => handleOrderChange(e.target.value)}
          className={styles.select}
        >
          <option value="recent">최신순</option>
          <option value="favorite">인기순</option>
        </select>

        <form onSubmit={handleSearch} className={styles.form}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어 입력"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            검색
          </button>
        </form>
      </div>

      {products.length === 0 && !loading ? (
        <div>제품이 없습니다.</div>
      ) : (
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>
                {product.price.toLocaleString()}원
              </p>
              {product.images && product.images.length > 0 && (
                <Link href={`/items/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`${styles.productImage} ${styles.clickableImage}`}
                  />
                </Link>
              )}
              <p className={styles.productTags}>
                태그: {product.tags.join(", ")}
              </p>
              <p className={styles.productTags}>
                좋아요: {product.favoriteCount}
              </p>
            </li>
          ))}
        </ul>
      )}

      {loading && <div className={styles.loading}>로딩 중...</div>}
      {!loading && currentPage <= totalPages && (
        <button onClick={loadMore} className={styles.loadMoreButton}>
          더 보기
        </button>
      )}
      <p className={styles.pageInfo}>현재 페이지: {currentPage}</p>
      <p className={styles.pageInfo}>페이지 당 제품 수: {ITEMS_PER_PAGE}</p>
      <p className={styles.pageInfo}>총 제품 수: {totalCount}</p>
    </div>
  );
};

export default ProductList;
