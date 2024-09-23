import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/price";
import styles from "./ItemList.module.css";
import img_default from "@/images/img_default.png";
import { MobileSearchBar } from "./MobileSearchBar";
import { DesktopSearchBar } from "./DesktopSearchBar";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function ItemList({
  products,
  sortOrder,
  keyword,
  onKeywordChange,
  onKeyDown,
  onSortChange,
}) {
  const deviceType = useDeviceType();
  return (
    <div className={styles.sell}>
      {deviceType === "mobile" ? (
        <MobileSearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onKeyDown={onKeyDown}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ) : (
        <DesktopSearchBar
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
                <Link href={ROUTES.ITEMS_DETAIL(id)}>
                  <img
                    className={styles.sellProduct}
                    src={images ? images : img_default}
                    alt={name ?? "Product image"}
                  />
                  <p className={styles.itemName}>{name}</p>
                  <p className={styles.itemPrice}>{`${formatPrice(
                    price
                  )} 원`}</p>
                  <p className={styles.itemFavoriteCnt}>
                    ♡ {favoriteCount ?? "0"}
                  </p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
