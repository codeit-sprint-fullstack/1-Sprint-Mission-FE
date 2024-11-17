import Link from "next/link";
import classNames from "classnames";

import ProductPreviewImage from "./ProductPreviwImage";
import ProductPreviewFavorite from "./ProductPreviewFavorite";

export interface BestProductPreviewProps {
  productId: string;
  img: string;
  name: string;
  price: number;
  isFavorite?: boolean;
  favoriteCount: number;
}

export default function BestProductPreview({
  productId,
  img,
  name,
  price,
  isFavorite = false,
  favoriteCount,
}: BestProductPreviewProps) {
  const linkTo = `/items/${productId}`;
  const imageFramClass = classNames(
    "w-[28.2rem]",
    "h-[28.2rem]",
    "ta:w-[34.3rem]",
    "ta:h-[34.3rem]",
    "mo:w-[34.3rem]",
    "mo:h-[34.3rem]",
    "box-content",
    "rounded-[1.6rem]",
    "ta:rounded-[19.46rem]",
    "mo:rounded-[19.46rem]",
    "relative",
    "overflow-hidden"
  );
  const productInfoClass = classNames(
    "flex",
    "flex-col",
    "justify-between",
    "w-full",
    "h-[8rem]"
  );
  const productNameClass = classNames(
    "text-md",
    "leading-[2.4rem]",
    "font-medium",
    "truncate"
  );
  const productPriceClass = classNames(
    "text-lg",
    "leading-[2.6rem]",
    "font-bold",
    "truncate"
  );

  const priceText = price.toLocaleString("en-US") + "원";

  return (
    <Link href={linkTo}>
      <div>
        <div className={imageFramClass}>
          <ProductPreviewImage imgUrl={img} />
        </div>
        <div className={productInfoClass}>
          <div className={productNameClass}>{name}</div>
          <div className={productPriceClass}>{priceText}</div>
          <ProductPreviewFavorite
            productId={productId}
            isFavorite={isFavorite}
            favriteCount={favoriteCount}
          />
        </div>
      </div>
    </Link>
  );
}
