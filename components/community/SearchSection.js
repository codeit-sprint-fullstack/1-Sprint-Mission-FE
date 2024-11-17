import React from "react";
import { Select, Input } from "@/components/common/Input";
import styles from "@/pages/community/index.module.css";

const SearchSection = ({ search, setSearch, sort, setSort }) => (
  <div className={styles.searchSectionHug}>
    <Input
      type="text"
      placeholder="검색할 상품을 입력해주세요"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <Select
      defaultValue="recent"
      onChange={(e) => {
        setSort(e.target.value);
      }}
    >
      <option value="recent">최신순</option>
      <option value="like">좋아요순</option>
    </Select>
  </div>
);

export default SearchSection;
