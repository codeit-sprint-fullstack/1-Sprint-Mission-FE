'use client';
import ActionButton from '@shared/components/Buttons/ActionButton';
import SearchInput from '@shared/components/inputs/SearchInput';
import styles from '@shared/components/product/ProductToolbar.module.css';
import SortDropdown from '@shared/components/dropdowns/SortDropdown';
import { useSearchProductStore } from '@shared/store/product/searchProduct';

export default function ProductToolbar() {
  const { setSearch } = useSearchProductStore();
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles['container']}>
      <SearchInput
        page={'product-page'}
        placeholder={'검색할 상품을 입력해주세요'}
        onChange={onChange}
      />
      <ActionButton content={'상품 등록하기'} style={'create-product-button'} />
      <SortDropdown content={'최신순'} />
    </div>
  );
}
