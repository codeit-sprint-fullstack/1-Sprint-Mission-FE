import { useState, useEffect, useCallback } from "react";
import useWindowResize from "@/hooks/useWindowResize";
import Product from "@/components/ProductList.jsx";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import * as api from "@/pages/api/products.js";
import styles from "@/styles/Home.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const productsQuery = {
    orderBy: "recent",
    page: 1,
    pageSize: 10,
  };

  try {
    await queryClient.prefetchQuery({
      queryKey: ["products"],
      queryFn: () => api.getProducts(productsQuery),
    });
  } catch (error) {}

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productsQuery,
    },
  };
}

function itemsRouter({ dehydratedState, productsQuery }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Items productsQuery={productsQuery} />
    </HydrationBoundary>
  );
}

function Items({ productsQuery }) {
  const [params, setParams] = useState(productsQuery);

  const { data: productData } = useQuery({
    queryKey: ["products", params],
    queryFn: () => api.getProducts(params),
  });

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
    changeFromNextView();
  }, [changeFromNextView]);

  return (
    <main>
      <div className={styles.products_container}>
        <SearchBar
          isMobile={view === "isMobile"}
          orderBy={params.orderBy}
          onChange={handleChangeParams}
        />
        <div className={styles.Products}>
          {productData?.list.map((item) => (
            <Product key={item.id} itemValues={item} favorite={false} />
          ))}
        </div>
      </div>
      <Pagination
        onChange={handleChangeParams}
        params={params}
        totalCount={productData?.totalDataCount}
      />
    </main>
  );
}

export default itemsRouter;
