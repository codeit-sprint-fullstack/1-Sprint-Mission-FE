import React, { useState } from "react";
import "../assets/styles/App.css";

function KeywordSearch({ keyword, onSearch }) {
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(localKeyword);
    }
  };

  return (
    <input
      placeholder="검색할 상품을 입력해주세요"
      className="searchInput"
      value={localKeyword}
      onChange={(e) => setLocalKeyword(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default KeywordSearch;