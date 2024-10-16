import styles from "../styles/market.module.css";
import { getProducts } from "./api/products";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "../components/modal";
export default function Market() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [orderByField, setOrderByField] = useState("createdAt");
  const [orderDir, setOrderDir] = useState("asc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const response = await getProducts({
          params: {
            page: 1,
            pageSize: 4,
          },
        });
        setBestProducts(response);
        console.log(response);
      } catch (error) {
        console.error("상품을 못 찾음", error);
      }
    };
    fetchBestProducts();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({
          params: {
            page: 1,
            pageSize: 8,
            orderDir: orderDir,
            orderByField: orderByField,
          },
        });
        setProducts(response);
        console.log(response);
      } catch (error) {
        console.error("상품을 못 찾음", error);
      }
    };
    fetchProducts();
  }, [sortOrder]);
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const fetchProducts = async () => {
        try {
          const response = await getProducts({
            params: {
              page: 1,
              pageSize: 8,
              orderBy: "recent",
              keyword: searchValue,
            },
          });
          setProducts(response);
          console.log(response);
        } catch (error) {
          console.error("상품을 못 찾음", error);
        }
      };
      fetchProducts();
    }
    console.log("Search value:", searchValue);
  };

  const handleSelectChange = (e) => {
    setSortOrder(e.target.getAttribute("data-value"));
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className={styles.marketContainer}>
        <div className={styles.marketContent}>
          <div className={styles.marketTitle}>
            <p className={styles.marketTitleText}>베스트 상품</p>
          </div>
          <div className={styles.marketList}>
            {bestProducts.map((bestProducts) => (
              <div
                onClick={() => router.push(`/items/${bestProducts.id}`)}
                className={styles.marketItem}
                key={bestProducts.id}
              >
                <div className={styles.marketImg}>
                  <Image
                    src={bestProducts.images[0]}
                    alt="product"
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.marketInfo}>
                  <p className={styles.marketName}>{bestProducts.name}</p>
                  <p className={styles.marketPrice}>{bestProducts.price} 원</p>
                  <p className={styles.marketPrice}>
                    {"하트" + bestProducts.favoriteCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.marketContent}>
          <div className={styles.marketTitle}>
            <p className={styles.marketTitleText}>판매 중인 상품</p>
            <div className={styles.sellItem}>
              <input
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className={styles.sellItemInput}
                placeholder="검색할 상품을 입력해주세요"
              />
              <img
                className={styles.sellItemImg}
                src={"./search.svg"}
                alt="검색 아이콘"
              />
              <button
                className={styles.sellItemBtn}
                onClick={() => {
                  router.push("/items/createItem");
                }}
              >
                상품 등록하기
              </button>
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownButton}
                  onClick={toggleDropdown}
                >
                  {sortOrder}
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdownContent}>
                    <div
                      className={styles.dropdownItem}
                      data-value="최신순"
                      onClick={() => {
                        setSortOrder("최신순");
                        setOrderByField("createdAt");
                        setOrderDir("asc");
                        setIsDropdownOpen(false);
                      }}
                    >
                      최신순
                    </div>
                    <div
                      className={styles.dropdownItem}
                      data-value="좋아요순"
                      onClick={() => {
                        setSortOrder("좋아요순");
                        setOrderByField("favoriteCount");
                        setOrderDir("desc");
                        setIsDropdownOpen(false);
                      }}
                    >
                      좋아요순
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.marketList}>
            {products.map((products) => (
              <div
                onClick={() => router.push(`/items/${products.id}`)}
                className={styles.marketItem}
                key={products.id}
              >
                <div className={styles.marketImg}>
                  <Image
                    src={products.images[0]}
                    alt="product"
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.marketInfo}>
                  <p className={styles.marketName}>{products.name}</p>
                  <p className={styles.marketPrice}>{products.price} 원</p>
                  <p className={styles.marketPrice}>
                    {"하트" + products.favoriteCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
