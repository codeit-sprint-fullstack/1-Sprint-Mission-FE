import styles from "./ProductSearchBar.module.css";

const ProductSearchBar = ({
  productSearch,
  setProductSearch,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} className={styles.searchBar}>
    <img
      src="/image/glass.svg"
      alt="검색 아이콘"
      className={styles.searchIcon}
    />
    <input
      type="text"
      placeholder="검색할 상품을 입력해주세요"
      value={productSearch}
      onChange={(e) => setProductSearch(e.target.value)}
      className={styles.searchBarInput}
    />
  </form>
);

export default ProductSearchBar;

