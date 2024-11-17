"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Status } from "@prisma/client";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type ProductWithRelations = RouterOutput["product"]["list"]["items"][0];

const DEFAULT_PRODUCT_IMAGE = "/images/placeholder-no-image.svg";

interface ProductCardProps {
  product: ProductWithRelations;
  size?: "normal" | "large";
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="rounded-[16px] object-cover transition-transform duration-200 group-hover:scale-105"
      onError={() => setImgSrc(DEFAULT_PRODUCT_IMAGE)}
    />
  );
};

export const ProductCard = ({ product, size = "normal" }: ProductCardProps) => {
  if (!product?.id) {
    return null;
  }

  const productUrl = `/product/${product.id}`;

  return (
    <Link href={productUrl} className="group block h-full">
      <div className="h-full w-full overflow-hidden rounded-lg border-none transition-all hover:shadow-md">
        <div
          className={`relative aspect-square w-full ${
            size === "large" ? "h-96" : "h-auto"
          }`}
        >
          {product.images?.[0] ? (
            <ProductImage src={product.images[0]} alt={product.title} />
          ) : (
            <Image
              src={DEFAULT_PRODUCT_IMAGE}
              alt="상품 이미지 없음"
              fill
              className="rounded-[16px] object-cover transition-transform duration-200 group-hover:scale-105"
            />
          )}
          {product.status === Status.SOLD && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[16px] bg-secondary-900 bg-opacity-50">
              <span className="text-[48px] font-bold text-secondary-200">
                판매완료
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="mb-2 truncate text-[14px] font-[500] text-secondary-800">
            {product.title}
          </h3>
          <p className="text-[16px] font-[700]">
            {new Intl.NumberFormat("ko-KR").format(product.price)}원
          </p>

          <div className="mt-2 flex items-center space-x-2">
            <div className="flex items-center">
              <span>
                <Image
                  src="/icons/icon-like-inactive.svg"
                  alt="하트 아이콘"
                  width={16}
                  height={16}
                />
              </span>
              <span className="ml-1 text-[12px] text-secondary-600">
                {product._count?.likes ?? 0}
              </span>
            </div>
            <div className="flex items-center">
              <span>
                <Eye size={16} color="grey" />
              </span>
              <span className="ml-1 text-[12px] text-secondary-600">
                {product.views ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
