// pages/items/index.js

import React, { useState, useEffect } from "react";
import axios from "../../lib/axios";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Products.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://panda-market-api.vercel.app/products"
      );
      setItems(response.data.list);
    } catch (error) {
      console.error("상품 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <h1 className={styles.title}>판매 중인 상품</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>상품 등록하기</button>
        </div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <div className={styles.productGrid}>
            {items.length > 0 ? (
              items.map((item) => (
                <Link
                  href={`/items/${item.id}`}
                  key={item.id}
                  className={styles.productItem}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={item.images[0]}
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
              ))
            ) : (
              <p>상품이 없습니다.</p>
            )}
          </div>
        )}
        <div className={styles.pagination}>
          <button>{"<"}</button>
          <button className={styles.active}>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>{">"}</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemsPage;
