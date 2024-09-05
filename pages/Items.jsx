import ProductList from "@/components/ProductList.jsx";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import * as api from "@/pages/api/products.js";
import useWindowResize from "@/hooks/useWindowResize";

export async function getServerSideProps() {
  const productsQuery = {
    order: "recent",
    page: 1,
    pageSize: 10,
  };

  let items = [];
  let productsTotalCount = 0;

  try {
    const { list, totalCount } = await api.getProductsAxios(productsQuery);
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

  const loadProducts = async (query) => {
    try {
      const { list, totalCount } = await api.getProductsAxios(query);
      setProducts(list);
      setTotalDataCount(totalCount);
    } catch (e) {
      console.log(e.message);
    }
  };

  const view = useWindowResize();
  const changeFromNextView = () => {
    switch (view) {
      case "isDesktop":
        onObjectChange({ pageSize: 10, page: 1 });
        break;
      case "isTablet":
        onObjectChange({ pageSize: 6, page: 1 });
        break;
      case "isMobile":
        onObjectChange({ pageSize: 4, page: 1 });
        break;
      default:
    }
  };

  useEffect(() => {
    loadProducts(params);
  }, [params]);

  useEffect(() => {
    changeFromNextView();
  }, [view]);

  return (
    <main>
      <div className="products_container">
        <SearchBar
          isMobile={view === "isMobile"}
          order={params.order}
          onChange={onChange}
        />
        <ProductList items={products} favorite={false} />
      </div>
      <Pagination
        onChange={onChange}
        params={params}
        totalCount={totalDataCount}
      />
    </main>
  );
}

export default Items;
