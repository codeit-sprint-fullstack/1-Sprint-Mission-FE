import styles from '../styles/market.module.css';
import { getProducts } from './api/products';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Product } from './api/types/productTypes'; // Product 타입을 임포트해야 합니다.
import { AxiosResponse } from 'axios';

export function isAxiosResponse<T>(
  response: any
): response is AxiosResponse<T> {
  return (
    response && response.status !== undefined && response.data !== undefined
  );
}

export default function Market() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('최신순');
  const [orderByField, setOrderByField] = useState<string>('createdAt');
  const [orderDir, setOrderDir] = useState<string>('asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const response = await getProducts({
          page: 1,
          pageSize: 4,
        });

        if (isAxiosResponse(response)) {
          setBestProducts(response.data.products);
        } else {
          console.error('상품을 찾지 못했습니다.', response);
        }
      } catch (error) {
        console.error('상품을 못 찾음', error);
      }
    };
    fetchBestProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({
          page: 1,
          pageSize: 8,
          orderDir: orderDir,
          orderByField: orderByField,
        });

        if (isAxiosResponse(response)) {
          setProducts(response.data.products);
        } else {
          console.error('상품을 찾지 못했습니다.', response);
        }
      } catch (error) {
        console.error('상품을 못 찾음', error);
      }
    };
    fetchProducts();
  }, [sortOrder, orderByField, orderDir]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const fetchProducts = async () => {
        try {
          const response = await getProducts({
            page: 1,
            pageSize: 8,
            orderByField: 'createdAt',
            keyword: searchValue,
          });

          if (isAxiosResponse(response)) {
            setProducts(response.data.products);
          } else {
            console.error('상품을 찾지 못했습니다.', response);
          }
        } catch (error) {
          console.error('상품을 못 찾음', error);
        }
      };
      fetchProducts();
    }
    console.log('Search value:', searchValue);
  };

  const handleSelectChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.getAttribute('data-value');
    if (value) {
      setSortOrder(value);
      setIsDropdownOpen(false);
    }
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
            {bestProducts.map((bestProduct) => (
              <div
                onClick={() => router.push(`/items/${bestProduct.id}`)}
                className={styles.marketItem}
                key={bestProduct.id}
              >
                <div className={styles.marketImg}>
                  <Image
                    src={bestProduct.images[0]}
                    alt="product"
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.marketInfo}>
                  <p className={styles.marketName}>{bestProduct.name}</p>
                  <p className={styles.marketPrice}>{bestProduct.price} 원</p>
                  <p className={styles.marketPrice}>
                    {'하트' + bestProduct.favoriteCount}
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
              <Image
                className={styles.sellItemImg}
                src={'/search.svg'}
                alt="검색 아이콘"
                width={24}
                height={24}
              />
              <button
                className={styles.sellItemBtn}
                onClick={() => {
                  router.push('/items/createItem');
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
                        setSortOrder('최신순');
                        setOrderByField('createdAt');
                        setOrderDir('asc');
                        setIsDropdownOpen(false);
                      }}
                    >
                      최신순
                    </div>
                    <div
                      className={styles.dropdownItem}
                      data-value="좋아요순"
                      onClick={() => {
                        setSortOrder('좋아요순');
                        setOrderByField('favoriteCount');
                        setOrderDir('desc');
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
            {products.map((product) => (
              <div
                onClick={() => router.push(`/items/${product.id}`)}
                className={styles.marketItem}
                key={product.id}
              >
                <div className={styles.marketImg}>
                  <Image
                    src={product.images[0]}
                    alt="product"
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.marketInfo}>
                  <p className={styles.marketName}>{product.name}</p>
                  <p className={styles.marketPrice}>{product.price} 원</p>
                  <p className={styles.marketPrice}>
                    {'하트' + product.favoriteCount}
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
