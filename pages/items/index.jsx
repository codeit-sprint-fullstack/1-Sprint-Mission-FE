import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { getProducts } from "@/utils/productAPI";
import BestProductList from "@/components/items/BestProductList";
import NormalProductList from "@/components/items/NormalProductList";
import Pagination from "@/components/common/Pagination";
import { Input, Select } from "@/components/common/Input";
import Button from "@/components/common/SmallButton";
import styles from "./index.module.css";

const ProductPage = () => {
  const router = useRouter();
  const [bestProducts, setBestProducts] = useState([]);
  const [normalProducts, setNormalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState(null);
  const ITEMS_PER_PAGE = 10;
  const BEST_ITEMS_COUNT = 4;

  const fetchProducts = useCallback(async (page, sort, keyword) => {
    try {
      setLoading(true);
      setError(null);

      const normalResponse = await getProducts({
        page,
        pageSize: ITEMS_PER_PAGE,
        orderBy: sort,
        keyword: keyword || undefined,
      });

      const bestResponse = await getProducts({
        page: 1,
        pageSize: BEST_ITEMS_COUNT,
        orderBy: "favorite",
      });

      if (normalResponse && Array.isArray(normalResponse.products)) {
        setNormalProducts(normalResponse.products);
        setTotalPages(normalResponse.totalPages || 1);
        setCurrentPage(normalResponse.currentPage || 1);
      } else {
        setError("일반 상품 데이터를 불러오는 데 문제가 발생했습니다.");
      }

      if (bestResponse && Array.isArray(bestResponse.products)) {
        setBestProducts(bestResponse.products);
      } else {
        setError("베스트 상품 데이터를 불러오는 데 문제가 발생했습니다.");
      }
    } catch (err) {
      setError("상품을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentPage, sortBy, searchKeyword);
  }, [currentPage, sortBy, searchKeyword, fetchProducts]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.elements.search.value;
    setSearchKeyword(keyword === "" ? null : keyword);
    setCurrentPage(1);
  };

  const handleAddProduct = () => {
    router.push("/items/write");
  };

  return (
    <div className={styles.container}>
      {error && (
        <div className={styles.error}>
          {error}
          <Button
            onClick={() => fetchProducts(currentPage, sortBy, searchKeyword)}
          >
            다시 시도
          </Button>
        </div>
      )}

      <section>
        <p className={styles.sectionTitle}>베스트 상품</p>
        {loading ? (
          <div>베스트 상품을 불러오는 중입니다...</div>
        ) : (
          <BestProductList products={bestProducts} />
        )}
      </section>
      <section>
        <div className={styles.controlsContainer}>
          <p className={styles.bestSectionTitle}>판매중인 상품</p>
          <div className={styles.controlsHug}>
            <form className={styles.searchInput} onSubmit={handleSearch}>
              <Input
                name="search"
                placeholder="상품 검색..."
                className={styles.searchInput}
              />
            </form>
            <Button onClick={handleAddProduct}>상품 등록하기</Button>
            <Select onChange={handleSortChange} value={sortBy}>
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </Select>
          </div>
        </div>

        {loading ? (
          <div>상품을 불러오는 중입니다...</div>
        ) : normalProducts.length === 0 ? (
          <div>표시할 상품이 없습니다.</div>
        ) : (
          <NormalProductList products={normalProducts} />
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductPage;
