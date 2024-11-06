import React from "react";
import { formatPrice } from "@/utils/price";
import styles from "./ItemList.module.css";
import img_default from "@/images/img_default.png";
import { MobileSearchBar } from "./MobileSearchBar";
import { DesktopSearchBar } from "./DesktopSearchBar";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useDeviceType } from "@/hooks/useDeviceType";
import Image from "next/image";
import { Product } from "@/types/Types";

// Props 타입 정의
interface ItemListProps {
  products: Product[];
  sortOrder: string;
  keyword: string;
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSortChange: (value: string) => void;
  onOptionChange?: (value: string) => void; // MobileSearchBar용으로 선택적(optional) prop으로 설정
}

export default function ItemList({
  products,
  sortOrder,
  keyword,
  onKeywordChange,
  onKeyDown,
  onSortChange,
  onOptionChange,
}: ItemListProps) {
  const deviceType = useDeviceType();
  const productArray = Object.values(products);
  console.log(typeof productArray);

  return (
    <div className={styles.sell}>
      {deviceType === "mobile" ? (
        <MobileSearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onKeyDown={onKeyDown}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          // onOptionChange={onOptionChange}
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
                    src={images && images.length > 0 ? images[0] : img_default}
                    alt={name}
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
