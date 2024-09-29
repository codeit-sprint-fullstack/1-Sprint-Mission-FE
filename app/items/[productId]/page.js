import Link from "next/link";
import classNames from "classnames";

import Product from "./Product";
import ProductCommentSection from "./ProductCommentSection";
import AuthRoute from "@/app/components/AuthRoute";
import { getProduct } from "@/lib/api-codeit-product";

export default async function ProductPage({ params }) {
  const { productId } = params;

  const product = await getProduct({ productId: productId });
  // const product_id = product.id;
  // const description = product.description;

  // const product = {
  //   id: 259,
  //   name: "GPT",
  //   description: "검색하지말고 질문하세요! 간단합니다!!",
  //   price: 10000000,
  //   tags: ["AI", "IT"],
  //   images: [
  //     "https://i.namu.wiki/i/Trhh3NbX78ZqUJyFblACvejsfPNdAXXN8jQtPo10nSVq7Bk1ZvDKB9d1balCxMLeWXDbZ8U_R1XWhuIwI1dVFA.svg",
  //   ],
  //   ownerId: 187,
  //   favoriteCount: 2,
  //   createdAt: "2024-09-25T04:49:03.316Z",
  //   updatedAt: "2024-09-25T06:20:17.109Z",
  //   ownerNickname: "aaaa11",
  //   isFavorite: false,
  // };

  // 게시글과 동일. tailwind.config로 정의 필요 : btnFrameClass, linkClass, btnToItemsClass
  const btnFrameClass = classNames(
    "flex",
    "flex-row",
    "content",
    "h-4.8rem",
    "mt-btn-to-list-frame-mt",
    "mb-btn-to-list-frame-mb"
  );
  const linkClass = classNames("my-0", "mx-auto");

  return (
    <AuthRoute>
      <div className="content main">
        <Product product={product} />
        <ProductCommentSection productId={productId} />
        <div className={btnFrameClass}>
          <Link href="/items" className={linkClass}>
            <button className={"btn-to-list"} />
          </Link>
        </div>
      </div>
    </AuthRoute>
  );
}
