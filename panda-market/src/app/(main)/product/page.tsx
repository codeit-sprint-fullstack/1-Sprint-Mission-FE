"use client";

import useMediaQuery from "@/app/_hooks/useMediaQuery";
import { useState, useEffect } from "react";
import { Status } from "@prisma/client";
import { api } from "@/app/_trpc/client";
import { BestProducts } from "@/app/_components/product/BestProducts";
import { ProductCard } from "@/app/_components/product/ProductCard";
import { SearchSection } from "@/app/_components/product/SearchSection";
import { Pagination } from "@/app/_components/common/Pagination";
import { type SortOption } from "@/app/_components/common/SortDropdown";
import { Loader } from "@/app/_components/common/Loader";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");

  const isTablet = useMediaQuery("(min-width: 744px)");
  const isPC = useMediaQuery("(min-width: 1200px)");

  const getLimit = () => {
    if (isPC) return 8;
    if (isTablet) return 6;
    return 4;
  };

  const limit = getLimit();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const { data, isLoading } = api.product.list.useQuery(
    {
      page,
      limit,
      status: status ?? undefined,
      search: searchQuery || undefined,
      sort,
    },
    {
      placeholderData: (previousData) => previousData,
    },
  );

  const handleSearch = (query: string) => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setPage(1);
    }
  };

  return (
    <div>
      <BestProducts />

      <div className="container mx-auto px-4 pb-16">
        <SearchSection
          status={status}
          onStatusChange={setStatus}
          sort={sort}
          onSortChange={setSort}
          defaultQuery={searchQuery}
          onSearch={handleSearch}
        />
        {isLoading && !data ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div>
              <Loader />
            </div>
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-secondary-500">등록된 상품이 없습니다.</div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-4 tablet:grid-cols-3 pc:grid-cols-4">
              {" "}
              {data.items.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard product={product} size="normal" />
                </div>
              ))}
            </div>

            {data.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={data.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
