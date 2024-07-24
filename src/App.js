import React from "react";
import { CreateNav } from "./Nav";
import { BestList } from "./best";
import { SellList } from "./Sell";
import { Shift } from "./PageShift";
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
      <Shift />
    </>
  );
};

export default App;
