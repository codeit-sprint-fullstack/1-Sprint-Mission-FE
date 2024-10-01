import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, mode = "normal" }) => {
  const getClassName = (baseName) => {
    if (mode === "best") {
      const capitalizedBaseName =
        baseName.charAt(0).toUpperCase() + baseName.slice(1);
      return styles[`best${capitalizedBaseName}`];
    }
    return styles[baseName];
  };

  return (
    <div className={getClassName("productCard")}>
      {product.images && product.images.length > 0 && (
        <Link
          href={`/items/${product.id}`}
          className={getClassName("productImageLink")}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            width={mode === "best" ? 282 : 221}
            height={mode === "best" ? 282 : 221}
            className={getClassName("productImage")}
          />
        </Link>
      )}
      <div className={getClassName("productInfo")}>
        <h2 className={getClassName("productName")}>{product.name}</h2>
        <p className={getClassName("productPrice")}>
          {product.price.toLocaleString()}원
        </p>
        <div className={getClassName("productTagsHug")}>
          <Image
            src="/images/ic_heart.svg"
            alt="Favorite"
            width={16}
            height={16}
            className={getClassName("heartIcon")}
          />
          <p className={getClassName("productTagsText")}>
            {product.favoriteCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
