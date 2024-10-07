import React from "react";
import { formatPrice } from "@/utils/price";
import styles from "./ItemList.module.css";
import img_default from "@/images/img_default.png";
import { MobileSearchBar } from "./MobileSearchBar.jsx";
import { DesktopSearchBar } from "./DesktopSearchBar.jsx";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useDeviceType } from "@/hooks/useDeviceType";
import Image from "next/image";

export default function ItemList({
  products,
  sortOrder,
  keyword,
  onKeywordChange,
  onKeyDown,
  onSortChange,
  onOptionChange,
}) {
  const deviceType = useDeviceType();
  const imageUrl = "https://thrift-shop.onrender.com";
  return (
    <div className={styles.sell}>
      {deviceType === "mobile" ? (
        <MobileSearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onKeyDown={onKeyDown}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          onOptionChange={onOptionChange}
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
                  <Image
                    className={styles.sellProduct}
                    src={images[0] ? `${imageUrl}${images[0]}` : img_default}
                    alt={images && images.length > 0 ? name : ""}
                    width={221}
                    height={221}
                    priority
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
