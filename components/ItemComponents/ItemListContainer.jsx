import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ItemList from "./ItemList";

export default function ItemListContainer() {
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  const { products, loading, error, handleSortChange, handleKeywordSearch } =
    useProducts();

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleKeywordSearch(keyword);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ItemList
      products={products}
      sortOrder={sortOrder}
      keyword={keyword}
      onKeywordChange={handleKeywordChange}
      onKeyDown={handleKeyDown}
      onSortChange={handleSortChange}
    />
  );
}
