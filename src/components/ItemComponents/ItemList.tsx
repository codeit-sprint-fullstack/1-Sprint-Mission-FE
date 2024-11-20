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
  const productArrays = Object.values(products);
  const productArray = productArrays[0];
  const acc = Object.values(productArray);

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
          acc.map((item: any) => {
            return (
              <div key={item.id} className={styles.sellProductItem}>
                <Link href={ROUTES.ITEMS_DETAIL(item.id)}>
                  <Image
                    className={styles.sellProduct}
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : img_default
                    }
                    alt={item.name}
                    width={221}
                    height={221}
                    priority
                  />
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>{`${formatPrice(
                    item.price
                  )} 원`}</p>
                  <p className={styles.itemFavoriteCnt}>
                    ♡ {item.favoriteCount ?? "0"}
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
