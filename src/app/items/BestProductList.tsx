import classNames from "classnames";

import BestProductPreview from "./BestProductPreview";

import { ProductData } from "src/types/product";

interface BestProductListProps {
  bestProductList: ProductData[];
}

export default function BestProductList({
  bestProductList,
}: BestProductListProps) {
  const bestProductListClass = classNames(
    "mt-[2.6rem]",
    "ta:mt-[2.3rem]",
    "mo:mt-[1.7rem]"
  );
  const bestProductToolsClass = classNames("flex", "flex-row", "h-[3.2rem]");
  const bestProductToolsLabelClass = classNames(
    "text-xl",
    "leading-[3.2rem]",
    "font-bold"
  );
  const bestProductListFrame = classNames(
    "mt-[1.6rem]",
    "flex",
    "flex-row",
    "gap-x-[2.4rem]",
    "ta:gap-x-[1rem]",
    "overflow-hidden"
  );

  return (
    <div className={bestProductListClass}>
      <div className={bestProductToolsClass}>
        <div className={bestProductToolsLabelClass}>베스트 상품</div>
      </div>
      <div className={bestProductListFrame}>
        {bestProductList.map((item, index) => (
          <BestProductPreview
            key={`${item.id}-${index}`}
            productId={item.id}
            img={item.images[0]}
            name={item.name}
            price={item.price}
            isFavorite={item.isFavorite}
            favoriteCount={item.favoriteCount}
          />
        ))}
      </div>
    </div>
  );
}
