import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, mode = "normal" }) => {
  const [imageError, setImageError] = useState(false);

  const getClassName = (baseName) => {
    if (mode === "best") {
      const capitalizedBaseName =
        baseName.charAt(0).toUpperCase() + baseName.slice(1);
      return styles[`best${capitalizedBaseName}`];
    }
    return styles[baseName];
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc =
    imageError || !product.images || product.images.length === 0
      ? "/images/img_default.svg"
      : product.images[0];

  return (
    <div className={getClassName("productCard")}>
      <Link
        href={`/items/${product.id}`}
        className={getClassName("productImageLink")}
      >
        <Image
          src={imageSrc}
          alt={product.name}
          width={mode === "best" ? 282 : 221}
          height={mode === "best" ? 282 : 221}
          className={getClassName("productImage")}
          onError={handleImageError}
        />
      </Link>
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
