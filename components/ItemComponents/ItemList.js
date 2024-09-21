import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/price";
import styles from "./ItemList.module.css";
import Image from "next/image";
import img_default from "@/images/img_default.png";
import { MobileSearchBar } from "./MobileSearchBar";
import { DesktopSearchBar } from "./DesktopSearchBar";

export default function ItemList({
  products,
  sortOrder,
  keyword,
  onKeywordChange,
  onKeyDown,
  onSortChange,
}) {
  return (
    <div className={styles.sell}>
      {products.length > 4 ? (
        <DesktopSearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onKeyDown={onKeyDown}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ) : (
        <MobileSearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onKeyDown={onKeyDown}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      )}

      <div className={styles.sellProductList}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((item) => {
            const { id, name, price, favoriteCount, images } = item ?? {};
            return (
              <div key={id} className={styles.sellProductItem}>
                <Image
                  className={styles.sellProduct}
                  src={img_default}
                  alt={name ?? "Product image"}
                  width={150}
                  height={150}
                />
                <p className={styles.itemName}>{name}</p>
                <p className={styles.itemPrice}>{`${formatPrice(price)} 원`}</p>
                <p className={styles.itemFavoriteCnt}>
                  ♡ {favoriteCount ?? "0"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
