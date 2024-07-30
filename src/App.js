import React from "react";
import { NavBar } from "./NavBar/NavBar";
import { BestList } from "./BestList/BestList";
import { SellList } from "./Sell/SellList";
import "./App.css";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
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
