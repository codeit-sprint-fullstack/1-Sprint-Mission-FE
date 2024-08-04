// src/components/Filter.js
import React from "react";

function Filter({ onChange }) {
  return (
    <select onChange={onChange}>
      <option value="createdAt">최신 순</option>
      <option value="favoriteCount">좋아요 순</option>
    </select>
  );
}

export default Filter;
