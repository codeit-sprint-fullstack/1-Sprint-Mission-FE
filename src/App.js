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
        <BestList />
        <SellList />
      </main>
    </>
  );
};

export default App;
