import Header from "./header.js";
import "../css/reset.css";
import "../css/app.css";
import ProductList from "./productLsit.js";
import Search from "./search.js";
import Paging from "./paging.js";
import { useState, useEffect } from "react";
import * as api from "../api.js";

function App() {
  const ProductsQuery = {
    order: "recent",
    keyword: "",
    page: 1,
    pagesize: 10,
  };

  const [params, setParams] = useState(ProductsQuery);
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);

  const onChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      [name]: value,
    }));
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
      const { list } = await api.getProducts({
        ...ProductsQuery,
        order: "favorite",
        pagesize: 4,
      });
      setBestItems(list);
    } catch (e) {
      console.log(e.message);
    }
  };

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
          <Search order={params.order} onChange={onChange} />
          <ProductList items={items} favorite={false} />
        </div>
        <Paging onChange={onChange} pageNum={params.page} />
      </main>
    </div>
  );
}

export default App;
