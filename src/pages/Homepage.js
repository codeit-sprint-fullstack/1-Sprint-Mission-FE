import React, { useState, useCallback, useEffect } from "react";
import imgUrl from "../assets/ic_heart.png";
import arrow_left from "../assets/arrow_left.png";
import arrow_right from "../assets/arrow_right.png";
import search from "../assets/ic_search.png";
import dropdown from "../assets/ic_arrow_down.png";
import styles from "./HomePage.module.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("createdAt");
  const [selectedOrder, setSelectedOrder] = useState("최신순");

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://panda-market-api.vercel.app/products"
      );
      const data = await response.json();
      setProducts(data.list);
    } catch (error) {
      console.error("Error fetching products:");
    }
  };

  const fetchBestProducts = async () => {
    try {
      const response = await fetch(
        "https://panda-market-api.vercel.app/products?sort=favorite" // favorite으로 정렬된 베스트 상품 API 호출
      );
      const data = await response.json();
      setBestProducts(data.list); // 베스트 상품 데이터 설정
    } catch (error) {
      console.error("Error fetching best products:");
    }
  };

  useEffect(() => {
    fetchProducts(); // 일반 상품 데이터 가져오기
    fetchBestProducts(); // 베스트 상품 데이터 가져오기
  }, []);

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleNewestClick = () => {
    setOrder("createdAt");
    setSelectedOrder("최신순");
    setIsOpen(false);
  };

  const handleFavoriteClick = () => {
    setOrder("favoriteCount");
    setSelectedOrder("좋아요순");
    setIsOpen(false);
  };

  const sortedProducts = products.sort((a, b) => b[order] - a[order]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className={styles.best}>
        <h1>베스트 상품</h1>
        <div className={styles.flexBox}>
          {bestProducts.slice(0, 4).map((product) => (
            <div key={product.id} className={styles.product}>
              <img
                src={product.images[0]}
                alt={product.name}
                className={styles.img}
              />
              <p className={styles.title}>{product.name}</p>
              <p className={styles.price}>{product.price}원</p>
              <p className={styles.zzim}>
                <img src={imgUrl} alt="heart" className={styles.icon} />
                <span className={styles.heart}>{product.favoriteCount}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <h1>판매 중인 상품</h1>
          <div className={styles.flex}>
            <img src={search} alt="search icon" className={styles.search} />
            <input
              type="text"
              name="keyword"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="검색할 상품을 입력해주세요"
            ></input>
            <button>상품 등록하기</button>
            <div className={styles.dropdownMenu} onClick={handleButtonClick}>
              <p className={styles.dropdown}>
                {selectedOrder}
                <img src={dropdown} alt="dropdown icon" />
              </p>
              {isOpen && (
                <ul className={styles.popup}>
                  <li onClick={handleNewestClick}>최신순</li>
                  <li onClick={handleFavoriteClick}>좋아요순</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={styles.flexBox}>
          {sortedProducts.map((product) => (
            <div key={product.id} className={styles.product}>
              <img
                src={product.images[0]}
                alt={product.name}
                className={styles.productImage}
              />
              <p className={styles.title}>{product.name}</p>
              <p className={styles.price}>{product.price}원</p>
              <p className={styles.zzim}>
                <img src={imgUrl} alt="heart" className={styles.icon} />
                <span className={styles.heart}>{product.favoriteCount}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pagination}>
        <button>
          <img src={arrow_left} />
        </button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>
          <img src={arrow_right} />
        </button>
      </div>
    </>
  );
}

export default HomePage;
