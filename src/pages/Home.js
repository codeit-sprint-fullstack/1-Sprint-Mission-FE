import "../css/reset.css";
import "../css/app.css";
import ProductList from "../components/productlist.js";
import Search from "../components/search.js";
import Paging from "../components/paging.js";
import useWindowSize from "../hooks/resize.js";
import { useState, useEffect } from "react";
import * as api from "../api.js";

function Home() {
  const productsQuery = {
    order: "recent",
    page: 1,
    pageSize: 10,
  };

  const bestProductsQuery = {
    order: "favorite",
    pageSize: 4,
  };

  const [params, setParams] = useState(productsQuery);
  const [bestParams, setBestParams] = useState(bestProductsQuery);
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);
  const [view, setView] = useState();
  const [totalDataCount, setTotalDataCount] = useState(0);

  const onChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onObjectChange = (obj) => {
    setParams((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const onBestChange = (name, value) => {
    setBestParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeView = (value) => {
    setView(value);
  };

  const loadProducts = async (query) => {
    try {
      const { list, totalCount } = await api.getProductsAxios(query);
      setItems(list);
      setTotalDataCount(totalCount);
    } catch (e) {
      console.log(e.message);
    }
  };

  const loadBestProducts = async (bestParams) => {
    try {
      const { list, totalCount } = await api.getProductsAxios(bestParams);
      setBestItems(list);
      setTotalDataCount(totalCount);
    } catch (e) {
      console.log(e.message);
    }
  };

  useWindowSize(onObjectChange, onBestChange, onChangeView);

  useEffect(() => {
    loadBestProducts(bestParams);
    loadProducts(params);
  }, [params, bestParams]);

  return (
    <main>
      <div className="products_container">
        <h2>베스트 상품</h2>
        <ProductList items={bestItems} favorite={true} />
      </div>
      <div className="products_container">
        <Search
          isMobile={view === "isMobile" ? true : false}
          order={params.order}
          onChange={onChange}
        />
        <ProductList items={items} favorite={false} />
      </div>
      <Paging
        onChange={onChange}
        pageNum={params.page}
        paseSize={params.pageSize}
        totalCount={totalDataCount}
      />
    </main>
  );
}

export default Home;
