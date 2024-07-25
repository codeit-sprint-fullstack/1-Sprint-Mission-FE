import Header from "./header.js";
import "../css/reset.css";
import "../css/app.css";
import ProductList from "./productLsit.js";
import Search, { MobileSearch } from "./search.js";
import Paging from "./paging.js";
import useWindowSize from "../hooks/resize.js";
import { useState, useEffect } from "react";
import * as api from "../api.js";

function App() {
  const ProductsQuery = {
    order: "recent",
    page: 1,
    pagesize: 10,
  };

  const bestProductsQuery = {
    order: "favorite",
    pagesize: 4,
  };

  const [params, setParams] = useState(ProductsQuery);
  const [bestParams, setBestParams] = useState(bestProductsQuery);
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);
  const [view, setView] = useState("Desktop");

  const onChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      [name]: value,
    }));
  };

  const onBestChange = (name, value) => {
    setBestParams((prev) => ({
      ...prev,
      page: 1,
      [name]: value,
    }));
  };

  const viewChange = (retView) => {
    setView(retView);
  };

  const loadProducts = async (query) => {
    try {
      const { list } = await api.getProducts(query);
      setItems(list);
    } catch (e) {
      console.log(e.message);
    }
  };

  const loadBestProducts = async () => {
    try {
      const { list } = await api.getProducts(bestParams);
      setBestItems(list);
    } catch (e) {
      console.log(e.message);
    }
  };

  useWindowSize(onChange, viewChange, onBestChange);

  useEffect(() => {
    loadBestProducts();
    loadProducts(params);
  }, [params]);

  return (
    <div className="App">
      <Header></Header>
      <main>
        <div className="products_container">
          <h2>베스트 상품</h2>
          <ProductList items={bestItems} favorite={true} />
        </div>
        <div className="products_container">
          {view === "isMobile" ? (
            <MobileSearch
              view={view}
              order={params.order}
              onChange={onChange}
            />
          ) : (
            <Search view={view} order={params.order} onChange={onChange} />
          )}

          <ProductList items={items} favorite={false} />
        </div>
        <Paging onChange={onChange} pageNum={params.page} />
      </main>
    </div>
  );
}

export default App;
