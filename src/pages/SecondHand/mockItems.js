import React, { useState, useEffect, useCallback, useRef } from "react";
import PaginationBtn from "pages/Product/paginationButtons";
import ProductManagement from "pages/Product/productManagement";
import ProductManagementSmall from "pages/Product/productManagementSmall";
import usePageSize from "hooks/usePageSize";
import useViewportSize from "hooks/useViewportSize";
import ProductCard from "components/ProductCard";
import mockImage from "assets/images/img-default.png";
import "assets/styles/App.css";

const generateProducts = (pageSize, currentPage) => {
  const productList = [];
  const totalProducts = 100;

  for (let i = 1; i <= pageSize; i++) {
    const productId = (currentPage - 1) * pageSize + i;
    if (productId > totalProducts) break;
    productList.push({
      id: productId,
      name: "로봇청소기",
      images: mockImage,
      price: "1,500,000",
      favoriteCount: 240,
    });
  }

  return {
    list: productList,
    totalCount: totalProducts,
  };
};

function MockItems() {
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
      const productsFromAPI = generateProducts(pageSize, currentPage);

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
  }, [currentPage, pageSize]);

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

export default MockItems;
