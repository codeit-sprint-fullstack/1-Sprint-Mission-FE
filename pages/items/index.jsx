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
  const [bestLoading, setBestLoading] = useState(true);
  const [normalLoading, setNormalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");
  const ITEMS_PER_PAGE = 10;

  const fetchProducts = useCallback(async (page, sort, keyword) => {
    try {
      setBestLoading(true);
      setNormalLoading(true);
      const [bestResponse, normalResponse] = await Promise.all([
        getProducts({ page: 1, pageSize: 4, orderBy: "favorite" }),
        getProducts({ page, pageSize: ITEMS_PER_PAGE, orderBy: sort, keyword }),
      ]);

      setBestProducts(bestResponse.products);
      setNormalProducts(normalResponse.products);
      setTotalPages(Math.ceil(normalResponse.totalCount / ITEMS_PER_PAGE));
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setBestLoading(false);
      setNormalLoading(false);
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
    setSearchKeyword(e.target.elements.search.value);
    setCurrentPage(1);
  };

  const handleAddProduct = () => {
    router.push("/items/write");
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}

      <section>
        <p className={styles.sectionTitle}>베스트 상품</p>
        <BestProductList products={bestProducts} loading={bestLoading} />
      </section>
      <section>
        <div className={styles.controlsContainer}>
          <p className={styles.bestSectionTitle}>판매중인 상품</p>
          <div className={styles.controlsHug}>
            <Input
              name="search"
              placeholder="상품 검색..."
              className={styles.searchInput}
            />
            <Button onClick={handleAddProduct}>상품 등록하기</Button>
            <Select onChange={handleSortChange} defaultValue={sortBy}>
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </Select>
          </div>
        </div>

        <NormalProductList products={normalProducts} loading={normalLoading} />
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
