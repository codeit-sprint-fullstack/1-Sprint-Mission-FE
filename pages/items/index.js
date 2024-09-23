// pages/items/index.js

import React, { useState, useEffect } from "react";
import axios from "../../lib/axios";
import Link from "next/link";
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
      const response = await axios.get("/products");
      console.log("상품 목록 데이터:", response.data); // 데이터 확인
      setItems(response.data);
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
        <h1>중고마켓</h1>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <div className={styles.productList}>
            {items.length > 0 ? (
              items.map((item) => {
                console.log("item.id:", item.id); // item.id 확인
                return (
                  <div key={item.id} className={styles.productItem}>
                    <Link href={`/items/${item.id}`}>
                      <a>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                      </a>
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>상품이 없습니다.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ItemsPage;
