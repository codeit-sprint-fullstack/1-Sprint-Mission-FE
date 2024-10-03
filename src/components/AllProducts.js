import { useRouter } from 'next/router';
import { useGetProducts } from "../hooks/useGetProducts"; // 커스텀 훅 import
import ProductSearchBar from '../components/ProductSearchBar';
import RegisterButton from '../components/RegisterButton';
import SortOptions from '../components/SortOptions';
import Pagination from '../components/Pagination';
import styles from '../styles/itemList.module.css';

const AllProducts = ({
  page,
  setPage,
  screenType,
  productSearch,
  setProductSearch,
  sortOrder,
  onSearchSubmit,
  totalPages,
}) => {
  const router = useRouter();

  // 커스텀 훅 사용해서 데이터 가져오기
  const { products, isLoading, error } = useGetProducts(page);

  const handleProductClick = (id) => {
    router.push(`/products/${id}`);
  };

  if (isLoading) return <p>상품을 불러오는 중입니다...</p>;
  if (error) return <p>상품을 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className={styles.allProductsContainer}>
      {screenType !== 'mobile' && (
        <div className={styles.allProductHeader}>
          <div className={styles.headerMenu}>
            <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
            <RegisterButton navigate={router.push} />
            <ProductSearchBar
              productSearch={productSearch}
              setProductSearch={setProductSearch}
            />
            <SortOptions
              sortOrder={sortOrder}
              setPage={setPage}
              screenType={screenType}
            />
          </div>
        </div>
      )}

      {screenType === 'mobile' && (
        <>
          <div className={styles.headerMenu}>
            <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
            <RegisterButton navigate={router.push} />
          </div>

          <div className={styles.searchFormWrapper}>
            <ProductSearchBar
              productSearch={productSearch}
              setProductSearch={setProductSearch}
            />
            <SortOptions
              sortOrder={sortOrder}
              setPage={setPage}
              screenType={screenType}
            />
          </div>
        </>
      )}

      <div className={styles.allProductsContents}>
        {products.map((item) => (
          <div
            key={item._id || item.id}
            className={styles.allProducts}
            onClick={() => handleProductClick(item._id || item.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={item.images?.[0] || '/image/img_default.svg'}
              alt={item.name}
              className={styles.productImg}
            />
            <h2 className={styles.productTitle}>{item.name}</h2>
            <h2 className={styles.productPrice}>
              {item.price.toLocaleString("ko-KR")}원
            </h2>
            <span className={styles.like}>
              <img src="../image/heart.svg" alt="좋아요" />
              {item.favoriteCount || 0}
            </span>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AllProducts;

