import React from "react";
import ItemListContainer from "@/components/ItemComponents/ItemListContainer.jsx";
import { fetchProducts } from "@/utils/productApi";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import BestProducts from "@/components/BestProductComponents/BestProducts";

export default function Items({
  initialProducts,
  initialTotalCount,
  bestProducts,
}) {
  return (
    <>
      <BestProducts bestProducts={bestProducts} />
      <ItemListContainer
        initialProducts={initialProducts}
        initialTotalCount={initialTotalCount}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  try {
    const { list: initialProducts, totalCount: initialTotalCount } =
      await fetchProducts({
        pageSize: 10,
        page: 1,
        keyword: "",
        orderBy: "recent",
      });

    const { list: bestProducts } = await fetchProducts({
      pageSize: 4,
      page: 1,
      keyword: "",
      orderBy: "favorite",
    });

    await queryClient.prefetchQuery({
      queryKey: ["products", 1],
      queryFn: () =>
        fetchProducts({
          pageSize: 10,
          page: 1,
          keyword: "",
          orderBy: "recent",
        }),
    });

    return {
      props: {
        initialProducts,
        initialTotalCount,
        bestProducts,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      props: {
        initialProducts: [],
        initialTotalCount: 0,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
}
