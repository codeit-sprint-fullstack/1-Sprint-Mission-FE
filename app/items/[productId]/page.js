import { getProduct } from "@/lib/api-codeit-product";
import Product from "./Product";

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

  return (
    <div className="content main">
      <Product product={product} />
    </div>
  );
}
