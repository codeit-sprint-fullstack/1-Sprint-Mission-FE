import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

//Next 기능
import Head from "next/head";
import Link from "next/link";

//중요 컴포넌트
import PageNav from "@components/PageNav";

// 데이터 렌더링 컴포넌트
import ProductList from "@components/renderData/ProductList";

//기타 컴포넌트
import SearchBar from "@components/common/SearchBar";
import BtnSquare from "@components/common/BtnSquare";
import SortBtn from "@components/common/SortBtn";
import DropdownModal from "@components/modal/DropdownModal";

//컨테이너
import CommonContainer from "@components/container/CommonContainer";
import BigHeader from "@components/container/Bigheader";

//API
import getProduct from "@hooks/api/getProduct";

// 커스텀 훅
// import useGetProductCount from "@hooks/useGetProductCount";
import { useGetWidth, useGetProductCount } from "@hooks/useGetWidth";

// 유틸
import { dataListSliceHalf } from "@utils/dataListSliceHalf";

const dropDownOptions = ["최신순", "좋아요순"];

function Items() {
  // 커스텀 훅
  // const productCount = useGetProductCount();

  const [bestProducts, setBestProducts] = useState([]);
  const [sellingProducts, setSellingProducts] = useState([]);

  const [pageSort, setPageSort] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSortText, setCurrentSortText] = useState(dropDownOptions[0]);

  const [dropDownToggle, setDropDownToggle] = useState(false);

  const width = useGetWidth();
  const productCount = useGetProductCount(width);

  useEffect(() => {
    getProduct(1, productCount.best, "favorite", "")
      .then((data) => {
        setBestProducts(data.list);
      })
      .catch((error) => console.error(error));
    }, [productCount]);

  useEffect(() => {
    getProduct(
      currentPage,
      productCount.selling,
      pageSort,
      searchKeyword
    )
      .then((data) => {
        setSellingProducts(dataListSliceHalf(data.list));
      })
      .catch((error) => console.error(error));
    }, [productCount, currentPage, searchKeyword, pageSort]);
    

  // // 베스트 상품 데이터 가져오기
  // useEffect(() => {
  //   console.log(productCount);
  //   console.log(productCount.best);
  //   getProduct(1, productCount.best, "favorite", "")
  //     .then((data) => {
  //       setBestProducts(data.list);
  //     })
  //     .catch((error) => console.error(error));
  // }, [currentPage]);

  // //일반 상품 데이터 가져오기
  // useEffect(() => {
  //   console.log(productCount);
  //   console.log(productCount.sellingProductSection);
  //   getProduct(
  //     currentPage,
  //     productCount.sellingProductSection,
  //     pageSort,
  //     searchKeyword
  //   )
  //     .then((data) => {
  //       console.log(data.list)
  //       console.log(dataListSliceHalf(data.list))
  //       setSellingProducts(dataListSliceHalf(data.list));
  //     })
  //     .catch((error) => console.error(error));
  // }, [productCount, currentPage, searchKeyword, pageSort]);

  const sortBtnOnClick = (e) => {
    setDropDownToggle(!dropDownToggle);
  };

  const optionsOnclick = (e) => {
    setCurrentSortText(e.target.value);
  };

  return (
    <>
      <Head>
        <title>판다마켓 - 상품</title>
      </Head>
      <PageNav />
      <CommonContainer>
        <section className={styles.bestProductSection}>
          <BigHeader>베스트 상품 </BigHeader>
          <ProductList dataList={bestProducts} />
        </section>
        <section className={styles.sellingProductSection}>
          <BigHeader>
            <p>판매 중인 상품</p>
            <section className={styles.functions}>
              <SearchBar />
              <Link href={"/items/register"}>
                <BtnSquare innerText="상품 등록하기" />
              </Link>
              <SortBtn CurrentOption={currentSortText} onClick={sortBtnOnClick}>
                {dropDownToggle && (
                  <DropdownModal
                    options={dropDownOptions}
                    onClick={optionsOnclick}
                  />
                )}
              </SortBtn>
            </section>
          </BigHeader>
          {sellingProducts.map((productList) => (
            <ProductList dataList={productList} key={productList[0].id} />
          ))}
        </section>
      </CommonContainer>
    </>
  );

  // const [ProductSortOption, setProductSortOption] = useState("recent");
  // const [searchKeyword, setSearchKeyword] = useState("");

  // // 커스텀 훅
  // const {
  //   bestProductCount,
  //   sellingProductCount,
  //   sellingProductCountPerRow,
  //   device,
  // } = useWindowWidhtSize();

  // const { productsList: bestProductData, noProduct: bestNoProduct } =
  //   useProductData(1, bestProductCount, "favorite", "");

  // const {
  //   productsList: sellingProductData,
  //   noProduct: sellingNoProduct,
  //   nowPage,
  //   totalPageSize,
  //   handlePageChange,
  // } = useProductData(1, sellingProductCount, ProductSortOption, searchKeyword);

  // // 검색어 핸들러
  // const handleSeachKeyword = (e) => {
  //   setSearchKeyword(e.target.value);
  // };

  // const handleSortOption = (option) => {
  //   setProductSortOption(option);
  // };

  // return (
  //   <div className={styles.bgSet}>
  //     <nav className={styles.navSet}>
  //       <PageNav />
  //     </nav>
  //     <main className={styles.mainContainer}>
  //       <section className={styles.bestSection}>
  //         <header className={styles.headerText}>베스트 상품</header>
  //         <ProductRenderPerRow productList={bestProductData} />
  //       </section>
  //       <section className={styles.SellingSection}>
  //         <SellingProductHeader text={"판매 중인 상품"} deviceType={device}/>
  //         <SellingProductRender productData={sellingProductData} />
  //       </section>
  //     </main>
  //     <footer>
  //       <Pagenation
  //         nowPage={nowPage}
  //         handlePageChange={handlePageChange}
  //         totalPageSize={totalPageSize}
  //       />
  //     </footer>
  //   </div>
  // );
}

export default Items;
