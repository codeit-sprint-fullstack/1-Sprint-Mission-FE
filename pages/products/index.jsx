import Head from "next/head";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import SearchBar from "@/components/form/SearchBar";
import Button from "@/components/ui/Button";
import DropDown from "@/components/ui/DropDown";
import Loader from "@/components/ui/Loader";
import styles from "@/styles/pages/products/main.module.scss";
import Message from "@/components/ui/Message";
import { ENTITY } from "@/variables/entities";
import BestProducts from "@/components/product/BestProducts";
import ProductList from "@/components/product/ProductList";
import { productKey } from "@/variables/queryKeys";
import { getProductList } from "@/service/api/product";
import Link from "next/link";
import { useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { useGetList } from "@/service/queries";
import { useAuth } from "@/context/AuthProvider";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: productKey.list({ pageSize: 4, orderBy: "favorite" }),
      queryFn: () => getProductList({ pageSize: 4, orderBy: "favorite" }),
    }),
    queryClient.prefetchQuery({
      queryKey: productKey.list({ orderBy: "recent", keyword: "", page: 1 }),
      queryFn: () => getProductList({ orderBy: "recent" }),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function ProductPage() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);

  const { user } = useAuth(true);

  const entity = ENTITY.PRODUCT;
  const {
    data: productData,
    isError,
    error,
    isPending,
  } = useGetList(entity, { orderBy, keyword, page });

  if (!user) {
    return null;
  }

  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  if (isPending) {
    return <Loader />;
  }
  const totalCount = productData?.totalCount;
  return (
    <>
      <Head>
        <title>중고 마켓</title>
      </Head>
      <section className={styles["product-best-section"]}>
        <h2>베스트 상품</h2>
        <BestProducts entity={entity} />
      </section>

      <section className={styles["product-section"]}>
        <div className={styles["product-section-topbar"]}>
          <h2>
            전체 상품 <span>{`(${productData.totalCount})`}</span>
          </h2>
          <SearchBar setKeyword={setKeyword} />
          <Link href="/products/registration" passHref>
            <Button variant="primary">상품등록하기</Button>
          </Link>
          <DropDown setOrderBy={setOrderBy} orderBy={orderBy} entity={entity} />
        </div>

        <ProductList data={productData} />

        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          totalCount={totalCount}
        />
      </section>
    </>
  );
}
