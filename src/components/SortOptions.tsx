import React, { useState } from "react";
import styles from "./SortOptions.module.css";
import { getProducts } from "../api/productApi";

interface SortOptionsProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
  setProducts: (products: any[]) => void;
  screenType: "mobile" | "pc";
}

const MobileSortOptions = ({
  sortOrder,
  setSortOrder,
  setProducts,
}: Omit<SortOptionsProps, 'screenType'>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);

    try {
      const products = await getProducts(1, 10, newSortOrder);
      setProducts(products);
    } catch (error) {
      console.error("상품 정보를 불러오는 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.sortOptionsContainer}>
      <div className={styles.sortButton} onClick={handleSortClick} />
      {isOpen && (
        <div className={`${styles.sortOptions} ${styles.active}`}>
          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="recent">최신순</option>
            <option value="favorite">인기순</option>
          </select>
          <img
            src="/image/down.svg"
            alt="Dropdown Icon"
            className={styles.dropdownIcon}
          />
        </div>
      )}
    </div>
  );
};

const PCSortOptions = ({
  sortOrder,
  setSortOrder,
  setProducts,
}: Omit<SortOptionsProps, 'screenType'>) => {
  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);

    try {
      const products = await getProducts(1, 10, newSortOrder);
      setProducts(products);
    } catch (error) {
      console.error("상품 정보를 불러오는 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.sortOptions}>
      <select
        className={styles.sortSelect}
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="recent">최신순</option>
        <option value="favorite">인기순</option>
      </select>
      <img
        src="/image/down.svg"
        alt="Dropdown Icon"
        className={styles.dropdownIcon}
      />
    </div>
  );
};

const SortOptions = ({
  sortOrder,
  setSortOrder,
  setProducts,
  screenType,
}: SortOptionsProps) => {
  if (screenType === "mobile") {
    return (
      <MobileSortOptions
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setProducts={setProducts}
      />
    );
  }
  return (
    <PCSortOptions
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      setProducts={setProducts}
    />
  );
};

export default SortOptions;

