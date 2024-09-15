import Head from "next/head";
import axios from "axios"; // axios 추가
import { useCallback, useEffect, useState } from "react";
import useWindowResize from "@/hooks/useWindowResize";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

export async function getServerSideProps() {
  const productsQuery = {
    orderBy: "recent",
    offset: 1,
    limit: 10,
  };

  const bestProductsQuery = {
    orderBy: "favorite",
    limit: 3,
  };

  let items = [];
  let bestItems = [];
  let productsTotalCount = 0;

  try {
    const { data } = await axios.get("http://localhost:3000/api/products", {
      params: productsQuery,
    });
    items = data.list;
    productsTotalCount = data.totalCount;
  } catch (e) {
    console.log(e.message);
  }

  try {
    const { data } = await axios.get("http://localhost:3000/api/products", {
      params: bestProductsQuery,
    });
    bestItems = data.list;
  } catch (e) {
    console.log(e.message);
  }

  return {
    props: {
      items,
      bestItems,
      productsTotalCount,
      productsQuery,
      bestProductsQuery,
    },
  };
}

export default function Home({
  items,
  bestItems,
  productsTotalCount,
  productsQuery,
  bestProductsQuery,
}) {
  const [params, setParams] = useState(productsQuery);
  const [bestParams, setBestParams] = useState(bestProductsQuery);
  const [products, setProducts] = useState(items);
  const [bestProducts, setBestProducts] = useState(bestItems);
  const [totalDataCount, setTotalDataCount] = useState(productsTotalCount);

  const handleChangeParams = (obj) => {
    setParams((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const handleChangeBestParams = (name, value) => {
    setBestParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/products", {
        params,
      });
      setProducts(data.list);
      setTotalDataCount(data.totalCount);
    } catch (e) {
      console.log(e.message);
    }
  }, [params]);

  const loadBestProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/products", {
        params: bestParams,
      });
      setBestProducts(data.list);
    } catch (e) {
      console.log(e.message);
    }
  }, [bestParams]);

  const view = useWindowResize();

  useEffect(() => {
    loadProducts();
    loadBestProducts();
  }, [loadProducts, loadBestProducts]);

  useEffect(() => {
    const changeFromNextView = () => {
      switch (view) {
        case "isDesktop":
          handleChangeParams({ limit: 10, offset: 1 });
          handleChangeBestParams("limit", 4);
          break;
        case "isTablet":
          handleChangeParams({ limit: 6, offset: 1 });
          handleChangeBestParams("limit", 2);
          break;
        case "isMobile":
          handleChangeParams({ limit: 4, offset: 1 });
          handleChangeBestParams("limit", 1);
          break;
        default:
      }
    };
    changeFromNextView();
  }, [view]);
}
