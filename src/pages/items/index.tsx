import React from "react";
import ItemListContainer from "@/components/ItemComponents/ItemListContainer";
import { fetchProducts } from "@/utils/productApi";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import BestProducts from "@/components/BestProductComponents/BestProducts";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Product } from "@/types/Types";

interface FetchProductsResponse {
  list: Product[];
  totalCount: number;
}

interface ItemsProps {
  initialProducts: Product[];
  initialTotalCount: number;
  bestProducts: Product[];
}

export default function Items({
  initialProducts,
  initialTotalCount,
  bestProducts,
}: ItemsProps) {
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

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    initialProducts: Product[];
    initialTotalCount: number;
    bestProducts: Product[];
    dehydratedState: any;
  }>
> {
  const queryClient = new QueryClient();

  try {
    // fetchProducts 함수 호출
    const productsData: any = await fetchProducts({
      pageSize: 10,
      page: 1,
      keyword: "",
      orderBy: "recent",
    });

    // 데이터가 FetchProductsResponse 형태인지 확인하고 가공합니다.
    const productsResponse: FetchProductsResponse = {
      list: Array.isArray(productsData) ? productsData : productsData.list,
      totalCount: productsData.totalCount ?? productsData.length,
    };

    const initialProducts = productsResponse.list;
    const initialTotalCount = productsResponse.totalCount;

    // Best Products도 동일하게 처리
    const bestProductsData: any = await fetchProducts({
      pageSize: 4,
      page: 1,
      keyword: "",
      orderBy: "favorite",
    });

    const bestProductsResponse: FetchProductsResponse = {
      list: Array.isArray(bestProductsData)
        ? bestProductsData
        : bestProductsData.list,
      totalCount: bestProductsData.totalCount ?? bestProductsData.length,
    };

    const bestProducts = bestProductsResponse.list;

    // React Query의 prefetch 사용
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
        bestProducts: [],
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
}
