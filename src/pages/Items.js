import "../css/reset.css";
import "../css/app.css";
import ProductList from "../components/Productlist.js";
import Search from "../components/Search.js";
import Paging from "../components/Paging.js";
import { useState, useEffect } from "react";
import * as api from "../api.js";
import useWindowSize from "../hooks/useResize.js";

function Items() {
  //코드잇 API이용
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
  const [items, setItems] = useState([]);
  const [bestParams, setBestParams] = useState(bestProductsQuery);
  const [view, setView] = useState();
  const [totalDataCount, setTotalDataCount] = useState(0);

  const onChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onBestChange = (name, value) => {
    setBestParams((prev) => ({
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

  const onChangeView = (value) => {
    setView(value);
  };

  const loadProducts = async (query) => {
    try {
      const { list, totalCount } = await api.getProductsAxios(query);
      // const list = await api.getProductsAxios(query);
      setItems(list);
      setTotalDataCount(totalCount);
    } catch (e) {
      console.log(e.message);
    }
  };

  useWindowSize(onObjectChange, onBestChange, onChangeView);

  useEffect(() => {
    loadProducts(params);
  }, [params]);

  return (
    <main>
      <div className="products_container">
        <Search
          isMobile={view === "isMobile" ? true : false}
          order={params.order}
          onChange={onChange}
        />
        <ProductList items={items} favorite={false} />
      </div>
      <Paging onChange={onChange} params={params} totalCount={totalDataCount} />
    </main>
  );
}

export default Items;
