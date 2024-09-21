import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/price";
import styles from "./ItemList.module.css";
import Image from "next/image";
import img_default from "@/images/img_default.png";
import { throttle } from "@/utils/throttle";
import { MobileSearchBar } from "./MobileSearchBar";
import { DesktopSearchBar } from "./DesktopSearchBar";

export default function ItemList({ products }) {
  const [productsList, setProductsList] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent"); // 정렬 상태 추가
  const [keyword, setKeyword] = useState(""); // 검색어 상태 추가
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색에 사용될 상태

  console.log(products);

  // 윈도우 사이즈에 맞춰 보여줄 상품 개수 조정
  useEffect(() => {
    const updateProducts = () => {
      const screenWidth = window.innerWidth;
      let maxProducts;

      if (screenWidth <= 743) {
        maxProducts = 4;
      } else if (screenWidth <= 1199) {
        maxProducts = 6;
      } else {
        maxProducts = 10;
      }

      let filteredProducts = products.slice(0, maxProducts);

      // 검색어 필터링
      if (searchKeyword) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      // 정렬
      if (sortOrder === "favorite") {
        filteredProducts = filteredProducts.sort(
          (a, b) => b.favoriteCount - a.favoriteCount
        );
      } else {
        filteredProducts = filteredProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      setProductsList(filteredProducts);
    };

    updateProducts();

    const throttledUpdate = throttle(updateProducts, 200);
    window.addEventListener("resize", throttledUpdate);

    return () => {
      window.removeEventListener("resize", throttledUpdate);
    };
  }, [products, searchKeyword, sortOrder]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeywordSearch = () => {
    setSearchKeyword(keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleKeywordSearch();
    }
  };

  return (
    <div className={styles.sell}>
      {productsList.length > 4 ? (
        <DesktopSearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      ) : (
        <MobileSearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}

      <div className={styles.sellProductList}>
        {productsList.length === 0 ? (
          <p>No products available</p>
        ) : (
          productsList.map((item) => {
            const { id, name, price, favoriteCount, images } = item ?? {};
            return (
              <div key={id} className={styles.sellProductItem}>
                <Image
                  className={styles.sellProduct}
                  src={img_default}
                  alt={name ?? "Product image"}
                  width={150}
                  height={150}
                />
                <p className={styles.itemName}>{name}</p>
                <p className={styles.itemPrice}>{`${formatPrice(price)} 원`}</p>
                <p className={styles.itemFavoriteCnt}>
                  ♡ {favoriteCount ?? "0"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
