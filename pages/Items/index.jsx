import { useState, useEffect, useCallback } from "react";
import useWindowResize from "@/hooks/useWindowResize";
import Product from "@/components/ProductList.jsx";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import * as api from "@/pages/api/products.js";
import styles from "@/styles/Home.module.css";
import useAuth from "@/contexts/authContext";

export async function getServerSideProps() {
  const productsQuery = {
    orderBy: "recent",
    page: 1,
    pageSize: 10,
  };

  let items = [];
  let productsTotalCount = 0;

  try {
    const { list, totalCount } = await api.getProducts(productsQuery);
    items = list;
    productsTotalCount = totalCount;
  } catch (e) {
    console.log(e.message);
  }

  return {
    props: {
      items,
      productsTotalCount,
      productsQuery,
    },
  };
}

function Items({ items, productsTotalCount, productsQuery }) {
  const [params, setParams] = useState(productsQuery);
  const [products, setProducts] = useState(items);
  const [totalDataCount, setTotalDataCount] = useState(productsTotalCount);

  useAuth();

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeParams = (obj) => {
    setParams((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const loadProducts = async (query) => {
    try {
      const { list, totalCount } = await api.getProducts(query);
      setProducts(list);
      setTotalDataCount(totalCount);
    } catch (e) {
      console.log(e.message);
    }
  };

  const view = useWindowResize();
  const changeFromNextView = useCallback(() => {
    switch (view) {
      case "isDesktop":
        handleChangeParams({ pageSize: 10, page: 1 });
        break;
      case "isTablet":
        handleChangeParams({ pageSize: 6, page: 1 });
        break;
      case "isMobile":
        handleChangeParams({ pageSize: 4, page: 1 });
        break;
      default:
    }
  }, [view]);

  useEffect(() => {
    loadProducts(params);
  }, [params]);

  useEffect(() => {
    changeFromNextView();
  }, [changeFromNextView]);

  return (
    <main>
      <div className={styles.products_container}>
        <SearchBar
          isMobile={view === "isMobile"}
          orderBy={params.orderBy}
          onChange={handleChange}
        />
        <div className={styles.Products}>
          {products.map((item) => (
            <Product key={item.id} itemValues={item} favorite={false} />
          ))}
        </div>
      </div>
      <Pagination
        onChange={handleChange}
        params={params}
        totalCount={totalDataCount}
      />
    </main>
  );
}

export default Items;
