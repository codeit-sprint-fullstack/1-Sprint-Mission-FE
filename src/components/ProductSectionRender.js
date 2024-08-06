import React from "react";

import { useEffect, useState } from "react";
import search from "../images/icon/ic_search.svg";
import arrow from "../images/icon/ic_arrow_down.svg";
import "./ProductSectionRender.css";
import "./ProductsListNav.css";

import ProductRender from "./ProductRender.js";
import getProductList from "../api/getProductsData.js";

function ProductSectionRender({
  nowPage,
  sort = "recent",
  productMaxCount,
  lineProductMaxCount = productMaxCount,
  navHeaderText,
  isNav = false,
  handlePageChange,
  // uniqueFunc = false,
}) {
  //옵션
  const [dropDownView, viewChange] = useState(false);
  const [optionText, optionTextChange] = useState("최신순");
  const [sortOption, sortOptionChange] = useState(sort);

  //검색창
  const [searchProduct, inputSet] = useState("");
  const [keyword, keywordSet] = useState("");

  //상품
  const [ProductsList, setProductsList] = useState([]);

  const [isThereProduct, setIsThereProduct] = useState(false);

  // 상품 불러오기
  useEffect(() => {
    getProductList(nowPage, productMaxCount, sortOption, keyword)
      .then((data) => {
        console.log(`data.list.length: ${data.list.length}`);
        if (data.list.length === 0) {
          handlesetisThereProduct();
        } else if (data.list.length < productMaxCount) {
          const newDataList = [
            ...data.list,
            ...Array(productMaxCount - data.list.length).fill({
              images: [search],
              name: "",
              description: "",
              price: 0,
              favoriteCount: 0,
            }),
          ];
          setProductsList(newDataList);
        } else {
          setProductsList(data.list);
        }
        console.log(`nowPage:${nowPage}`);
      })
      .catch((error) => console.error(error));
  }, [nowPage, sortOption, keyword]);

  const handlesetisThereProduct = () => {
    setIsThereProduct(!isThereProduct);
    console.log("No Product");
  };

  const handleInput = (e) => {
    inputSet(e.target.value);
    keywordSet(e.target.value);
    handlePageChange(1);
  };

  const toggleDropDownView = () => {
    viewChange(!dropDownView);
  };

  const handleOptionTextChange = (e, option) => {
    toggleDropDownView();
    optionTextChange(e.target.textContent);
    sortOptionChange(option);
  };

  //셀링 Nav
  const ProductsListNav = () => {
    const searchBar = isNav;
    const buttons = isNav;

    return (
      <nav className="navContain">
        <div className="navSubject">{navHeaderText}</div>

        {searchBar && (
          <div className="searchBox">
            <img src={search} alt="검색" />
            <input
              type="text"
              value={searchProduct}
              onChange={handleInput}
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
        )}
        {buttons && (
          <button className="registerBtn">
            <span>상품 등록하기</span>
          </button>
        )}
        {buttons && (
          <div>
            <button className="sortByBtn" onClick={toggleDropDownView}>
              <span>{optionText}</span>
              <img src={arrow} alt="클릭" />
            </button>
            {dropDownView && (
              <ul className="dropDownList">
                <li onClick={(e) => handleOptionTextChange(e, "recent")}>
                  최신순
                </li>
                <li onClick={(e) => handleOptionTextChange(e, "favorite")}>
                  좋아요순
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    );
  };

  const ProductsRender = () => {
    const sliceProducts = [];

    for (let i = 0; i < ProductsList.length; i += lineProductMaxCount) {
      sliceProducts.push(ProductsList.slice(i, i + lineProductMaxCount));
    }

    return sliceProducts.map((item, groupIndex) => (
      <ProductRender
        key={groupIndex}
        productList={item}
        isThereProduct={isThereProduct}
      />
    ));
  };

  return (
    <main>
      <nav className="sellingProductNav">{ProductsListNav()}</nav>
      <section className="sellingProductList">{ProductsRender()}</section>
    </main>
  );
}

export default ProductSectionRender;
