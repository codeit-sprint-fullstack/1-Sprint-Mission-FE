import React from "react";
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

//원래 렌더
import ProductRenter from "../components/ProductRender";
// 테스트
import ProductList from "../components/ProductList.js";

import "./Homepage.css";

import test from "../images/test.svg";
import test2 from "../images/test2.svg";
import test3 from "../images/test3.svg";

const HomePage = () => {
  const [nowPage, setnowPage] = useState(1);
  const showPageCount = 5;

  const handlePageChange = (page) => {
    setnowPage(page);
  };

  return (
    <body>
      <Header />
      <main className="bodySet">
        <nav className="bestProductNav">베스트 상품</nav>
        <section className="bestProductList">
          <ProductList />
          {/* <ProductRenter
            maxProduct={4}
            image={test}
            title={items.name}
            price="1000"
            like="100"
          /> */}
        </section>
        <nav className="sellingProductNav">
          <Nav />
        </nav>
        <section className="sellingProductList">
          <ProductRenter
            maxProduct={5}
            image={test2}
            title="test"
            price="1000"
            like="100"
          />
          <ProductRenter
            maxProduct={5}
            image={test3}
            title="test"
            price="1000"
            like="100"
          />
        </section>
      </main>
      <Footer
        nowPage={nowPage}
        showPageNum={showPageCount}
        onPageChange={handlePageChange}
      />
    </body>
  );
};

export default HomePage;
