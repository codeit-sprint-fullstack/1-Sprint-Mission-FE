import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./index.module.css";

//렌더링 컴포넌트
import PageNav from "../components/PageNav.js";
import SellingProductHeader from "../components/SellingProductHeader.js";
import SellingProductRender from "components/SellingProductRender";
import Pagenation from "components/Pagenation";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useWindowWidhtSize from "../hooks/useWindowWidhtSize.js";

// 리소스
import defaultImg from "images/mock/img_default.png";

function Marketpage() {
  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [dataList, setDataList] = useState([]);

  const { device } = useWindowWidhtSize();

  useEffect(() => {
    const dataObject = {
      images: [defaultImg],
      name: "로봇 청소기",
      description: "로봇 청소기",
      price: 1500000,
      favoriteCount: 240,
    };

    if (device === "PC") {
      const tempList = [];
      for (let i = 0; i < 10; i++) {
        tempList.push(dataObject);
      }
      setDataList(tempList);
    } else if (device === "Tablet") {
      const tempList = [];
      for (let i = 0; i < 6; i++) {
        tempList.push(dataObject);
      }
      setDataList(tempList);
    } else if (device === "Mobile") {
      const tempList = [];
      for (let i = 0; i < 4; i++) {
        tempList.push(dataObject);
      }
      setDataList(tempList);
    }
  }, [device]);

  // 커스텀 훅
  const nowPage = 1;
  const totalPageSize= 10;
  const handlePageChange = (page) => {
  }
  
  // 검색어 핸들러
  const handleSeachKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSortOption = (option) => {
    setProductSortOption(option);
  };

  return (
    <div className={styles.bgSet}>
      <nav className={styles.navSet}>
        <PageNav />
      </nav>
      <main className={styles.mainContainer}>
        <section className={styles.SellingSection}>
          <SellingProductHeader text={"판매 중인 상품"} deviceType={device} />
          <SellingProductRender productData={dataList} />
        </section>
      </main>
      <footer>
        <Pagenation
          nowPage={nowPage}
          handlePageChange={handlePageChange}
          totalPageSize={totalPageSize}
        />
      </footer>
    </div>
  );
}

export default Marketpage;
