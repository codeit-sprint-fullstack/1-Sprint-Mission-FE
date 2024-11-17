import classNames from "classnames";

import ProductImageListSet from "./ProductImageListSet";
import Profile from "src/app/components/Profile";
import DropDownKebabProduct from "./DropDownKebabProduct";
import Favorite from "src/app/components/Favorite";
import Date from "src/app/components/Date";

import { PROFILE_H40 } from "src/app/constants/Profile";
import { PRODUCT_DETAIL } from "src/app/constants/Favorite";
import { ProductData } from "src/types/product";

function Owner({ nickname }: { nickname: string }) {
  const middleBarOwnerClass = classNames(
    "text-md",
    "leading-24",
    "text-gray-600",
    "font-medium"
  );

  return <p className={middleBarOwnerClass}>{nickname}</p>;
}

function VerticalDivider() {
  const rightDivider = classNames(
    "w-full",
    "h-3.4rem",
    "border-r-1",
    "border-gray-100"
  );
  const leftDividerClass = classNames("w-2.4rem", "h-3.4rem");

  return (
    <div className="flex flex-row w-full">
      <div className={rightDivider}></div>
      <div className={leftDividerClass}></div>
    </div>
  );
}

function ProductInfoDivider() {
  const upperDividerClass = classNames(
    "w-full",
    "h-1.6rem",
    "border-b-1",
    "border-gray-100"
  );
  const lowerDividerClass = classNames("w-full", "h-2.4rem");
  return (
    <>
      <div className={upperDividerClass}></div>
      <div className={lowerDividerClass}></div>
    </>
  );
}

function ProductTag({ tag }: { tag: string }) {
  const tagText = "#" + tag;
  return <div className="product-tag-text">{tagText}</div>;
}

function ProductTagList({ tags }: { tags: string[] }) {
  const tagInfoClass = classNames("mo:mt-2.4rem");
  const listFrameClass = classNames(
    "mt-1.6rem",
    "flex",
    "flex-row",
    "flex-wrap",
    "gap-0.8rem",
    "ta:mt-0.8rem",
    "mo:mt-0.8rem"
  );
  const tagList = tags.map((tag, index) => {
    return <ProductTag key={`${index}-${tag}`} tag={tag} />;
  });

  return (
    <div className={tagInfoClass}>
      <div className="product-info-label">상품 태그</div>
      <div className={listFrameClass}>{tagList}</div>
    </div>
  );
}

function ProductInfo({ product }: { product: Omit<ProductData, "images"> }) {
  const productInfoClass = classNames("flex", "flex-col", "w-full");
  const productTopBarClass = classNames("flex", "flex-row", "justify-between");
  const productBottomBarClass = classNames(
    "w-full",
    "h-5rem",
    "mt-6.2rem",
    "flex",
    "flex-row",
    "items-center",
    "ta:mt-4rem",
    "mo:mt-4rem"
  );
  const bottomBarOwnerDateSetClass = classNames(
    "ml-1.6rem",
    "flex",
    "flex-col",
    "gap-0.2rem"
  );

  const priceText = product.price.toLocaleString("en-US") + "원";

  return (
    <div className={productInfoClass}>
      <div className={productTopBarClass}>
        <div className="product-name">{product.name}</div>
        <DropDownKebabProduct
          productId={product.id}
          ownerId={product.ownerId}
        />
      </div>
      <div className="product-price">{priceText}</div>
      <ProductInfoDivider />
      <div className="product-info-label">상품 소개</div>
      <div className="product-description">{product.description}</div>
      <ProductTagList tags={product.tags} />
      <div className={productBottomBarClass}>
        <Profile type={PROFILE_H40} />
        <div className={bottomBarOwnerDateSetClass}>
          <Owner nickname={product.ownerNickname} />
          <Date dbDate={product.createdAt} />
        </div>
        <VerticalDivider />
        <Favorite
          objectId={product.id}
          type={PRODUCT_DETAIL}
          myFavorite={product.isFavorite}
          favoriteCount={product.favoriteCount}
        />
      </div>
    </div>
  );
}

export default function Product({ product }: { product: ProductData }) {
  const productClass = classNames("content");
  const productFrameClass = classNames(
    "w-full",
    "flex",
    "flex-row",
    "gap-[2.4rem]",
    "mo:flex-col"
  );

  const { images, ...rest } = product;

  return (
    <div className={productClass}>
      <div className={productFrameClass}>
        <ProductImageListSet images={images} />
        <ProductInfo product={rest} />
      </div>
    </div>
  );
}
