import Link from "next/link";
import classNames from "classnames";
import ProductPreviewImage from "./ProductPreviwImage";
import ProductPreviewFavorite from "./ProductPreviewFavorite";

export default function ProductPreview({
  productId,
  img,
  title,
  price,
  isFavorite = false,
  favoriteCount,
}) {
  const linkTo = `/items/${productId}`;
  console.log("linkTo : ", linkTo);
  const productPreviewClass = classNames(
    "flex",
    "flex-col",
    "justify-between",
    "w-product-preview",
    "h-product-preview",
    "mobile:w-mobile-product-preview",
    "mobile:h-mobile-product-preview"
  );
  const imageFramClass = classNames(
    "w-product-preview-image",
    "h-product-preview-image",
    "mobile:w-mobile-product-preview-image",
    "mobile:h-mobile-product-preview-image",
    "box-content",
    "rounded-1.6rem",
    "relative",
    "overflow-hidden"
  );
  const productInfoClass = classNames(
    "flex",
    "flex-col",
    "justify-between",
    "w-full",
    "h-product-preview-info"
  );
  const productTitleClass = classNames(
    "text-md",
    "leading-24",
    "font-medium",
    "overflow-hidden",
    "text-nowrap",
    "text-ellipsis"
  );
  const productPriceClass = classNames(
    "text-lg",
    "leading-26",
    "font-bold",
    "overflow-hidden",
    "text-nowrap",
    "text-ellipsis"
  );

  const priceText = price.toLocaleString("en-US") + "원";

  return (
    <Link href={linkTo}>
      <div className={productPreviewClass}>
        <div className={imageFramClass}>
          <ProductPreviewImage imageUrl={img} />
        </div>
        <div className={productInfoClass}>
          <div className={productTitleClass}>{title}</div>
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
