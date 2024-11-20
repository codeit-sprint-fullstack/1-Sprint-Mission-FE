"use client";

import { api } from "@/app/_trpc/client";
import { ProductCard } from "@/app/_components/product/ProductCard";

export const BestProducts = () => {
  const { data, isLoading } = api.product.list.useQuery(
    {
      page: 1,
      limit: 4,
      sort: "likes",
    },
    {
      staleTime: 5 * 60 * 1000,
    },
  );

  if (isLoading || !data || data.items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">베스트 상품</h2>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 pc:grid-cols-4">
        {data.items.map((product, index) => (
          <div
            key={product.id}
            className={` ${index === 0 ? "block" : "hidden"} ${index < 2 ? "tablet:block" : "tablet:hidden"} pc:block`}
          >
            <ProductCard size="large" product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
