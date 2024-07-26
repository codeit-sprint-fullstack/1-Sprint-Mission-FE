import React from "react";
import { CreateNav } from "./Nav/Nav";
import { BestList } from "./Best/best";
import { SellList } from "./Sell/Sell";
import "./App.css";

const App = () => {
  return (
    <>
      <header>
        {/* 헤더 네비 바 생성 */}
        <CreateNav />
      </header>
      <main>
        {/* 베스트 상품 */}
        <BestList />
        {/* 검색 바와 판매 중인 상품 */}
        <SellList />
      </main>
    </>
  );
};

export default App;
