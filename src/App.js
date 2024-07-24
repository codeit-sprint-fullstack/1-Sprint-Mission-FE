import React from "react";
import { CreateNav } from "./Nav";
import { BestList } from "./Best";
import { SellList } from "./Sell";
import "./App.css";

const App = () => {
  return (
    <>
      <header>
        <CreateNav />
      </header>
      <main>
        <BestList />
        <SellList />
      </main>
    </>
  );
};

export default App;
