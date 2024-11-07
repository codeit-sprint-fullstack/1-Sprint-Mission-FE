import { useRouter } from 'next/router';
import { useGetProducts } from "../hooks/useGetProducts";
import ProductSearchBar from './ProductSearchBar';
import RegisterButton from './RegisterButton';
import SortOptions from './SortOptions';
import Pagination from './Pagination';
import styles from '../styles/itemList.module.css';

interface Product {
  id: number;
  _id?: number;
  name: string;
  price: number;
  images?: string[];
  likes?: number;
}

interface AllProductsProps {
  page: number;
  setPage: (page: number) => void;
  screenType: "mobile" | "pc";
  productSearch: string;
  setProductSearch: (search: string) => void;
  sortOrder: string;
  onSearchSubmit: () => void;
  totalPages: number;
}

const AllProducts: React.FC<AllProductsProps> = ({
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

  const { products, isLoading, error } = useGetProducts(page);

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className={styles.allProductsContainer}>
      {screenType !== 'mobile' && (
        <div className={styles.allProductHeader}>
          <div className={styles.headerMenu}>
            <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
            <RegisterButton title="상품 등록" content="상품 설명" addNewPost={() => {}} />
            <ProductSearchBar
              productSearch={productSearch}
              setProductSearch={setProductSearch}
              onSearchSubmit={onSearchSubmit}
            />
            <SortOptions
              sortOrder={sortOrder}
              setSortOrder={(order) => console.log(order)}
              setProducts={(setProducts) => console.log(setProducts)}
              screenType={screenType}
            />
          </div>
        </div>
      )}

      {screenType === 'mobile' && (
        <>
          <div className={styles.headerMenu}>
            <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
            <RegisterButton title="상품 등록" content="상품 설명" addNewPost={() => {}} />
          </div>

          <div className={styles.searchFormWrapper}>
            <ProductSearchBar
              productSearch={productSearch}
              setProductSearch={setProductSearch}
              onSearchSubmit={onSearchSubmit}
            />
            <SortOptions
              sortOrder={sortOrder}
              setSortOrder={(order) => console.log(order)}
              setProducts={(setProducts) => console.log(setProducts)}
              screenType={screenType}
            />
          </div>
        </>
      )}

      <div className={styles.allProductsContents}>
        {products.map((item: Product) => (
          <div
            key={(item._id || item.id).toString()}
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
              {item.likes || 0}
            </span>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AllProducts;

