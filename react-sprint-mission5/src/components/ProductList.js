// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import Pagination from "./Pagination";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태 추가
  const pageSize = 10;

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts(currentPage, pageSize, sort);
      setProducts(fetchedProducts.products);
      setTotalPages(Math.ceil(fetchedProducts.totalCount / pageSize)); // 총 페이지 수 계산
    };

    getProducts();
  }, [currentPage, sort]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setCurrentPage(1); // 정렬 기준 변경 시 페이지를 1로 초기화
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 상태 업데이트
  };

  return (
    <div>
      <Filter onChange={handleSortChange} />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
