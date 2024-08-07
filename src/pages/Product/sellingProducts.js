import React, { useState, useEffect, useCallback, useRef } from "react";
import * as Product from "API/ProductService.js";
import PaginationBtn from "./paginationButtons";
import ProductManagement from "./productManagement";
import ProductManagementSmall from "./productManagementSmall";
import usePageSize from "hooks/usePageSize";
import useViewportSize from "hooks/useViewportSize";
import ProductCard from "components/ProductCard";
import "assets/styles/App.css";

function SellingMarketPlace() {
  const { width } = useViewportSize();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const requestIdRef = useRef(0);

  const getPageSize = usePageSize({
    breakpoints: { mobile: 743, tablet: 1199, default: 9999 },
    sizes: { mobile: 4, tablet: 6, default: 10 },
  });

  const pageSize = getPageSize();

  const fetchProducts = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    try {
      const productsFromAPI = await Product.getProductList({
        page: currentPage,
        pageSize: pageSize,
        keyword: keyword,
        orderBy: sortOption,
      });

      if (requestId === requestIdRef.current) {
        setProducts(productsFromAPI.list);
        setTotalCount(productsFromAPI.totalCount);
        setLoading(false);
      }
    } catch (error) {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [currentPage, pageSize, keyword, sortOption]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  if (loading) {
    return <div>로딩중입니다, 잠시만 기다려주세요!</div>;
  }

  const isPhoneSize = width < 744;

  return (
    <div className="selling-market-container">
      {isPhoneSize ? (
        <ProductManagementSmall
          sortOption={sortOption}
          setSortOption={setSortOption}
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <ProductManagement
          sortOption={sortOption}
          setSortOption={setSortOption}
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
          setCurrentPage={setCurrentPage}
        />
      )}
      <div className="selling-market-display">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="product-card-image"
          />
        ))}
      </div>
      <PaginationBtn
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        itemsPerPage={pageSize}
      />
    </div>
  );
}

export default SellingMarketPlace;
