import React from "react";
import { CreateNav } from "./Nav/Nav";
import { BestList } from "./Best/best";
import { SellList } from "./Sell/Sell";
import { Shift } from "./PageShift/PageShift";
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
