import Link from "next/link";
import classNames from "classnames";
import ProductPreviewImage from "./ProductPreviwImage";
import ProductPreviewFavorite from "./ProductPreviewFavorite";

export interface ProductPreviewProps {
  productId: string;
  img: string;
  name: string;
  price: number;
  isFavorite?: boolean;
  favoriteCount: number;
}

export default function ProductPreview({
  productId,
  img,
  name,
  price,
  isFavorite = false,
  favoriteCount,
}: ProductPreviewProps) {
  const linkTo = `/items/${productId}`;
  const productPreviewClass = classNames(
    "flex",
    "flex-col",
    "justify-between",
    "w-[22.1rem]",
    "h-[31.7rem]",
    "mo:w-[16.8rem]",
    "mo:h-[26.4rem]"
  );
  const imageFramClass = classNames(
    "w-[22.1rem]",
    "h-[22.1rem]",
    "mo:w-[16.8rem]",
    "mo:h-[16.8rem]",
    "box-content",
    "rounded-[1.6rem]",
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
      <div className={productPreviewClass}>
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
