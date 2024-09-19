import { useState, useEffect, useCallback } from "react";
import useWindowResize from "@/hooks/useWindowResize";
import ProductList from "@/components/ProductList.jsx";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import * as api from "@/pages/api/products.js";

export async function getServerSideProps() {
  const productsQuery = {
    orderBy: "recent",
    offset: 1,
    limit: 10,
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
        handleChangeParams({ limit: 10, offset: 1 });
        break;
      case "isTablet":
        handleChangeParams({ limit: 6, offset: 1 });
        break;
      case "isMobile":
        handleChangeParams({ limit: 4, offset: 1 });
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
      <div className="products_container">
        <SearchBar
          isMobile={view === "isMobile"}
          orderBy={params.orderBy}
          onChange={handleChange}
        />
        <ProductList items={products} favorite={false} />
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
